import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  combineLatestAll,
  filter,
  map,
  mergeMap,
  Observable,
  of,
  toArray,
} from 'rxjs';
import CurrencyDto from './dto/currency.dto';

enum PayTypes {
  Tinkoff = '75',
  QIWI = '62',
  'Yandex.Money' = '88',
  Payeer = '51',
  'Bank Transfer' = '14',
  Rosbank = '185',
  ЮMoney = '274',
}

enum Assets {
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH',
}

enum Currencies {
  RUB = 'RUB',
}

@Injectable()
export class BybitService {
  constructor(private httpService: HttpService) {}

  getBybitCurrencies(): Observable<CurrencyDto[]> {
    const currencies = [
      'BTCUSDT',
      'BNBUSDT',
      'ETHUSDT',
      'BUSDUSDT',
      'SHIBUSDT',
    ];
    const currencyArr = [];
    for (const currency in currencies) {
      const bybitCur = `https://api.bybit.com/spot/quote/v1/ticker/price?symbol=${currencies[currency]}`;
      currencyArr.push(bybitCur);
    }

    return of(currencyArr).pipe(
      mergeMap((proj) => {
        return proj.map((val) => {
          return this.httpService.request({ url: val, method: 'GET' }).pipe(
            map((currency) => {
              return currency.data.result;
            }),
          );
        });
      }),
      combineLatestAll(),
    );
  }

  postUserBid(
    token: string,
    amount?: number,
  ): Observable<{
    minAmount: any;
    payType: string;
    quantity: any;
    recentExecuteRate: any;
    price: any;
    tokenName: any;
    currencyId: any;
    maxAmount: any;
    recentOrderNum: any;
    lastQuantity: any;
    tradeType: string;
  }> {
    const body_str = `userId=&tokenId=${token}&currencyId=RUB&payment=62&side=1&size=10&page=1&amount=${amount}`;
    console.log(body_str);
    return this.httpService
      .post(
        'https://api2.bybit.com/spot/api/otc/item/list',
        { data: body_str },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate, br',
            Accept: '*/*',
            Connection: 'keep-alive',
          },
        },
      )
      .pipe(
        map((response) => {
          const obj = JSON.parse(response.config.data);
          const input_str = obj.data.split('&');
          const payments = Object.entries(PayTypes);
          for (const payment in payments) {
            if (input_str[3].split('=')[1] === payments[payment][1]) {
              return {
                payType: payments[payment][0],
                tradeType:
                  response.data.result.items[0].side === 1 ? 'BUY' : 'SELL',
                tokenName: response.data.result.items[0].tokenName,
                currencyId: response.data.result.items[0].currencyId,
                price: response.data.result.items[0].price,
                quantity: response.data.result.items[0].quantity,
                lastQuantity: response.data.result.items[0].lastQuantity,
                minAmount: response.data.result.items[0].minAmount,
                maxAmount: response.data.result.items[0].maxAmount,
                recentOrderNum: response.data.result.items[0].recentOrderNum,
                recentExecuteRate:
                  response.data.result.items[0].recentExecuteRate,
              };
            }
          }
        }),
      );
  }

  getUserBids(): Observable<
    {
      minAmount: any;
      payType: string;
      quantity: any;
      recentExecuteRate: any;
      price: any;
      tokenName: any;
      currencyId: any;
      maxAmount: any;
      recentOrderNum: any;
      lastQuantity: any;
      tradeType: string;
    }[]
  > {
    const tradetype = {
      BUY: 0,
      SELL: 1,
    };

    const payments = Object.values(PayTypes);
    const assets = Object.values(Assets);
    const currencies = Object.values(Currencies);
    const tradetypes = Object.values(tradetype);
    const amounth = 1000;

    const bodyArr = [];
    for (const pay in payments) {
      for (const asset in assets) {
        for (const currency in currencies) {
          for (const tradetype in tradetypes) {
            const body_str = `userId=&tokenId=${assets[asset]}&currencyId=${currencies[currency]}&payment=${payments[pay]}&side=${tradetypes[tradetype]}&size=10&page=1&amount=${amounth}`;
            bodyArr.push(body_str);
          }
        }
      }
    }

    const posts$ = of(bodyArr).pipe(
      mergeMap((value) => {
        return value.map((val) => {
          return this.httpService.post(
            'https://api2.bybit.com/spot/api/otc/item/list',
            { data: val },
            {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'gzip, deflate, br',
                Accept: '*/*',
                Connection: 'keep-alive',
              },
            },
          );
        });
      }),
      combineLatestAll(),
    );

    const requsts$ = posts$.pipe(
      mergeMap((value) => {
        return value;
      }),
    );

    const response$ = requsts$.pipe(
      map((response) => {
        if (response.data.result.items[0] !== undefined) {
          const request_body = JSON.parse(response.config.data);
          const payments = Object.entries(PayTypes);
          const input_str = request_body.data.split('&');

          for (const payment in payments) {
            if (input_str[3].split('=')[1] === payments[payment][1]) {
              return {
                payType: payments[payment][0],
                tradeType:
                  response.data.result.items[0].side === 1 ? 'BUY' : 'SELL',
                tokenName: response.data.result.items[0].tokenName,
                currencyId: response.data.result.items[0].currencyId,
                price: response.data.result.items[0].price,
                quantity: response.data.result.items[0].quantity,
                lastQuantity: response.data.result.items[0].lastQuantity,
                minAmount: response.data.result.items[0].minAmount,
                maxAmount: response.data.result.items[0].maxAmount,
                recentOrderNum: response.data.result.items[0].recentOrderNum,
                recentExecuteRate:
                  response.data.result.items[0].recentExecuteRate,
              };
            }
          }
        }
      }),
      filter((res) => res !== undefined),
      toArray(),
    );

    return response$.pipe(
      map((res) => {
        return res;
      }),
    );
  }
}
