import { Controller, Get, Query } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import CurrencyDto from './dto/currency.dto';
import CurrencyEntity from '../../binance/entities/currency.entity';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiTags('Bybit Requests')
@Controller('bybit')
export class BybitController {
  constructor(private readonly bybitService: BybitService) {}

  @Get('/currency')
  @ApiResponse({
    status: 200,
    type: CurrencyEntity,
    isArray: true,
  })
  getBybitCurrencies(): Observable<CurrencyDto[]> {
    return this.bybitService.getBybitCurrencies();
  }

  @Get('/userbid')
  @ApiImplicitQuery({
    name: 'amount',
    required: false,
    type: Number,
  })
  postUserBid(
    @Query('token') token: string,
    @Query('amount') amount = 1000,
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
    return this.bybitService.postUserBid(token, amount);
  }

  @Get('/userbids')
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
    return this.bybitService.getUserBids();
  }
}
