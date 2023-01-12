import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { OkxService } from './okx.service';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
export enum CurrencyOKX {
  USDT = 'USDT',
  USDC = 'USDC',
  BTC = 'BTC',
  ETH = 'ETH',
  TUSD = 'TUSD',
  DAI = 'DAI',
}
@Controller('okx')
@ApiTags('OKX Requests')
export class OkxController {
  constructor(private okxService: OkxService) {}
  @Get('/userbid')
  @ApiQuery({ name: 'cryptocurrency', enum: CurrencyOKX })
  @ApiImplicitQuery({
    name: 'side',
    type: String,
    description: 'Тип сделки: buy/sell',
  })
  getSingleCurrency(
    @Query('side') side = 'sell',
    @Query('sum') sum: number,
    @Query('cryptocurrency') cryptocurrency: string,
  ) {
    return this.okxService.getSingleOKXCurrency(side, sum, cryptocurrency);
  }
}
