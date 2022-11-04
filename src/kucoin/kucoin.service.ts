import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { combineLatestAll, map, mergeMap, Observable, of } from 'rxjs';
import CurrencyDto from '../dto/currency.dto';
import { KucoinDto } from './dto/kucoin.dto';

interface KucoinUserBid {
  currency: string;
  type: string;
  fiat: string;
}

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
                price: parseFloat(currency.data.data.buy),
              };
            }),
          );
        });
      }),
      combineLatestAll(),
    );
  }

  getKucoinUserBid({
    currency,
    type,
    fiat,
  }: KucoinUserBid): Observable<KucoinDto> {
    const body = `currency=${currency}&side=${type}&legal=${fiat}&page=1`;
    return this.httpService
      .request({
        url: `https://www.kucoin.com/_api/otc/ad/list?${body}`,
        method: 'GET',
      })
      .pipe(
        map((response) => {
          const res_obj = response.data.items[0];
          const tradeArr = [];

          res_obj.adPayTypes.forEach((el: { payTypeCode: string }) => {
            if (el.payTypeCode !== 'OTHER') tradeArr.push(el.payTypeCode);
          });

          return {
            tradeType: res_obj.side === 'SELL' ? 'BUY' : 'SELL',
            payType: res_obj.legal,
            tradeToken: res_obj.currency,
            balance: parseFloat(res_obj.currencyQuantity),
            price: parseFloat(res_obj.floatPrice),
            minAmount: Number(res_obj.limitMinQuote),
            maxAmount: Number(res_obj.limitMaxQuote),
            tradePlatform: tradeArr,
          };
        }),
      );
  }
}
