import { Controller, Get, Query } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';

@ApiTags('Bybit Requests')
@Controller('bybit')
export class BybitController {
  constructor(private readonly bybitService: BybitService) {}

  @Get('/userbid')
  postUserBid(
    @Query('amount') amount: number,
    @Query('token') token: string,
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
    return this.bybitService.postUserBid(amount, token);
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
