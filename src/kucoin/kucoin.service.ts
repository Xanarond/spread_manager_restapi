import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { combineLatestAll, map, mergeMap, Observable, of } from 'rxjs';
import CurrencyDto from '../dto/currency.dto';

@Injectable()
export class KucoinService {
  constructor(private httpService: HttpService) {}

  getKucoinCurrencies(): Observable<CurrencyDto[]> {
    const currencies = [
      'BTC-USDT',
      'BNB-USDT',
      'ETH-USDT',
      'BUSD-USDT',
      'SHIB-USDT',
    ];

    const currencyArr = [];

    for (const currency in currencies) {
      const bybitCur = `https://api.kucoin.com/api/v1/market/stats?symbol=${currencies[currency]}`;
      currencyArr.push(bybitCur);
    }

    return of(currencyArr).pipe(
      mergeMap((proj) => {
        return proj.map((val) => {
          return this.httpService.request({ url: val, method: 'GET' }).pipe(
            map((currency) => {
              return {
                symbol: currency.data.data.symbol.split('-USDT')[0] + 'USDT',
                price: currency.data.data.buy,
              };
            }),
          );
        });
      }),
      combineLatestAll(),
    );
  }
}
