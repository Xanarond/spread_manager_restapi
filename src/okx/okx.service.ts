import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Injectable()
export class OkxService {
  constructor(private httpService: HttpService) {}

  getSingleOKXCurrency(side: string, sum: number, cryptocurrency: string) {
    const currency = this.httpService.get(
      `https://www.okx.com/v3/c2c/tradingOrders/books?quoteCurrency=rub&baseCurrency=${cryptocurrency.toLowerCase()}&side=${side}&paymentMethod=all&quoteMinAmountPerOrder=${sum}`,
      {
        headers: {
          'User-agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36',
          'Accept-Encoding': 'gzip, deflate, br',
          Accept: '*/*',
          Connection: 'keep-alive',
        },
      },
    );

    return currency.pipe(
      map((res) => {
        return { sell: res.data.data.sell, buy: res.data.data.buy };
      }),
    );
  }
}
