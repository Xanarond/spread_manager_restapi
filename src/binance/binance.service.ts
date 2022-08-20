import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  combineLatestAll,
  filter,
  forkJoin,
  map,
  mergeMap,
  Observable,
  of,
  toArray,
} from 'rxjs';
import { BinanceBidEntity } from './entities/bidsreq.entity';
import UserBid from './dto/userbid.dto';
import CurrencyDto from './dto/currency.dto';

@Injectable()
export class BinanceService {
  constructor(private httpService: HttpService) {}

  getCurrency(): Observable<CurrencyDto[]> {
    const with_rub = this.httpService.get(
      'https://api.binance.com/api/v3/ticker/price?symbols=["BTCRUB","BNBRUB","ETHRUB","USDTRUB","BUSDRUB","SHIBRUB"]',
    );
    const with_usd = this.httpService.get(
      'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","BNBUSDT","ETHUSDT","BUSDUSDT","SHIBUSDT"]',
    );

    return forkJoin([with_rub, with_usd]).pipe(
      map((result) => {
        return result.map((res) => {
          return res.data;
        });
      }),
    );
  }

  postUserBid(Bid: BinanceBidEntity): Observable<UserBid> {
    return this.httpService
      .post('https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', Bid)
      .pipe(
        map((response) => {
          const adv_obj = response.data.data[0].adv;
          return {
            payType: Bid.payTypes[0],
            asset: adv_obj.asset,
            fiatUnit: adv_obj.fiatUnit,
            price: adv_obj.price,
            tradableAmount: adv_obj.tradableAmount,
            amountAfterEditing: adv_obj.amountAfterEditing,
            maxSingleTransAmount: adv_obj.maxSingleTransAmount,
            minSingleTransAmount: adv_obj.minSingleTransAmount,
            nickName: response.data.data[0].advertiser.nickName,
            monthOrderCount: response.data.data[0].advertiser.monthOrderCount,
            monthFinishRate:
              response.data.data[0].advertiser.monthFinishRate * 100,
          };
        }),
      );
  }

  async postReformatObj(): Promise<
    Observable<
      {
        amountAfterEditing: any;
        publisherType: any;
        payType: any;
        tradableAmount: any;
        price: any;
        asset: any;
        fiatUnit: any;
        minSingleTransAmount: any;
        maxSingleTransAmount: any;
      }[]
    >
  > {
    enum Payments {
      Tinkoff = 'Tinkoff',
      QIWI = 'QIWI',
      RUBfiatbalance = 'RUBfiatbalance',
      YandexMoneyNew = 'YandexMoneyNew',
    }

    enum Assets {
      USDT = 'USDT',
      BTC = 'BTC',
      BNB = 'BNB',
      BUSD = 'BUSD',
      ETH = 'ETH',
      RUB = 'RUB',
    }

    const PubType = {
      none_type: null,
      merchant: 'merchant',
    };

    enum TradeType {
      BUY = 'BUY',
      SELL = 'SELL',
    }

    const payments = Object.values(Payments);
    const assets = Object.values(Assets);
    const pubtype = Object.values(PubType);
    const tradetype = Object.values(TradeType);

    const bids = [];

    for (const pay in payments) {
      for (const asset in assets) {
        for (const pub in pubtype) {
          for (const type in tradetype) {
            const Bid = new BinanceBidEntity();
            Bid.payTypes = [payments[pay]];
            Bid.asset = assets[asset];
            Bid.publisherType = pubtype[pub] || null;
            Bid.tradeType = tradetype[type];
            bids.push(Bid);
          }
        }
      }
    }

    const posts$ = of(bids).pipe(
      mergeMap((value) => {
        return value.map((val) => {
          return this.httpService.post(
            'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search',
            val,
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
      map((value) => {
        if (value.data.data[0] !== undefined) {
          const request_body = JSON.parse(value.config.data);
          return {
            payType: request_body.payTypes[0],
            tradeType: request_body.tradeType,
            publisherType: request_body.publisherType,
            asset: value.data.data[0].adv.asset,
            fiatUnit: value.data.data[0].adv.fiatUnit,
            price: value.data.data[0].adv.price,
            tradableAmount: value.data.data[0].adv.tradableAmount,
            amountAfterEditing: value.data.data[0].adv.amountAfterEditing,
            maxSingleTransAmount: value.data.data[0].adv.maxSingleTransAmount,
            minSingleTransAmount: value.data.data[0].adv.minSingleTransAmount,
            nickName: value.data.data[0].advertiser.nickName,
            monthOrderCount: value.data.data[0].advertiser.monthOrderCount,
            monthFinishRate:
              value.data.data[0].advertiser.monthFinishRate * 100,
            // request: request_body,
          };
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
