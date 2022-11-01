import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BinanceService } from './binance.service';
import { Observable } from 'rxjs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BinanceBidEntity } from './entities/bidsreq.entity';
import UserbidEntity from './entities/userbid.entity';
import UserBid from './dto/userbid.dto';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import CurrencyEntity from '../entities/currency.entity';
import CurrencyDto from '../dto/currency.dto';

@ApiTags('Binance Requests')
@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('/currency')
  @ApiOperation({ summary: 'Получить актуальный курс валют' })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CurrencyEntity,
  })
  getCurrency(): Observable<CurrencyDto[]> {
    return this.binanceService.getCurrency();
  }

  @Get('/currency_sum')
  @ApiOperation({
    summary: 'Получить актуальный курс валют на определенную сумму',
  })
  @ApiResponse({
    status: 200,
    isArray: true,
    type: CurrencyEntity,
  })
  @ApiImplicitQuery({
    name: 'sum',
    required: true,
    type: Number,
    description: 'Минимальная сумма на которую искать позиции сделки:',
  })
  getCurrencyWithSum(@Query('sum') sum = 1000): Observable<CurrencyDto[]> {
    return this.binanceService.getCurrencyWithSum(sum);
  }

  @ApiOperation({
    summary: 'Получить информацию о сделке p2p по определенным параметрам',
  })
  @ApiResponse({
    status: 200,
    type: UserbidEntity,
  })
  @Post('/userbid')
  postUserBid(@Body() Bid: BinanceBidEntity): Observable<UserBid> {
    return this.binanceService.postUserBid(Bid);
  }

  @ApiOperation({
    summary: 'Получить информацию о сделках p2p по определенным параметрам',
  })
  @Get('/userbids')
  @ApiImplicitQuery({
    name: 'sum',
    required: false,
    type: String,
    description: 'Минимальная сумма на которую искать позиции сделки:',
  })
  @ApiResponse({
    status: 200,
    type: UserbidEntity,
    isArray: true,
  })
  getUserBids(@Query('sum') sum = ''): Promise<Observable<UserBid[]>> {
    return this.binanceService.postReformatObj(sum);
  }
}
