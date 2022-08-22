import { Body, Controller, Get, Post } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { Observable } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BinanceBidEntity } from './entities/bidsreq.entity';
import UserbidEntity from './entities/userbid.entity';
import UserBid from './dto/userbid.dto';
import CurrencyDto from './dto/currency.dto';
import CurrencyEntity from './entities/currency.entity';

@ApiTags('Binance Requests')
@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}
  @Get('/currency')
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CurrencyEntity,
  })
  getCurrency(): Observable<CurrencyDto[]> {
    return this.binanceService.getCurrency();
  }

  @ApiOperation({ summary: 'Create request p2p' })
  @ApiResponse({
    status: 200,
    type: UserbidEntity,
  })
  @Post('/userbid')
  postUserBid(@Body() Bid: BinanceBidEntity): Observable<UserBid> {
    return this.binanceService.postUserBid(Bid);
  }

  @Get('/userbids')
  getUserBids(): Promise<
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
    return this.binanceService.postReformatObj();
  }
}
