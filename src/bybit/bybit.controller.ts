import { Controller, Get, Query } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { BybitEntity } from './entities/bybit.entity';
import { BybitDto } from './dto/bybit.dto';
import CurrencyEntity from '../entities/currency.entity';
import CurrencyDto from '../dto/currency.dto';

export enum Currency {
  USDT = 'USDT',
  BTC = 'BTC',
  ETH = 'ETH',
  USDC = 'USDC',
}

@ApiTags('Bybit Requests')
@Controller('bybit')
export class BybitController {
  constructor(private readonly bybitService: BybitService) {}

  @ApiOperation({ summary: 'Получить актуальный курс валют' })
  @Get('/currency')
  @ApiResponse({
    status: 200,
    type: CurrencyEntity,
    isArray: true,
  })
  getBybitCurrencies(): Observable<CurrencyDto[]> {
    return this.bybitService.getBybitCurrencies();
  }

  @ApiOperation({
    summary: 'Получить информацию о сделке p2p по определенным параметрам',
  })
  @Get('/userbid')
  @ApiQuery({ name: 'token', enum: Currency })
  @ApiImplicitQuery({
    name: 'amount',
    required: false,
    type: Number,
    description: 'Минимальная сумма на которую искать позиции сделки:',
  })
  @ApiResponse({
    status: 200,
    type: BybitEntity,
  })
  postUserBid(
    @Query('token') token: string,
    @Query('amount') amount = 1000,
  ): Observable<BybitDto> {
    return this.bybitService.postUserBid(token, amount);
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
    type: BybitEntity,
    isArray: true,
  })
  getUserBids(@Query('sum') sum = ''): Observable<BybitDto[]> {
    return this.bybitService.getUserBids(sum);
  }
}
