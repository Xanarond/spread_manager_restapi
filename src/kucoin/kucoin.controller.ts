import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { KucoinService } from './kucoin.service';
import CurrencyEntity from '../entities/currency.entity';
import CurrencyDto from '../dto/currency.dto';
import { KucoinDto } from './dto/kucoin.dto';
import { KucoinEntity } from './entities/kucoin.entity';

enum Currency {
  usdt = 'USDT',
  btc = 'BTC',
  eth = 'ETH',
  kcs = 'KCS',
  usdc = 'USDC',
}

enum Type {
  buy = 'BUY',
  sell = 'SELL',
}

enum Fiat {
  usd = 'USD',
  rub = 'RUB',
}

@ApiTags('Kucoin Requests')
@Controller('kucoin')
export class KucoinController {
  constructor(private readonly kucoinService: KucoinService) {}

  @ApiOperation({ summary: 'Получить актуальный курс валют' })
  @Get('/currency')
  @ApiResponse({
    status: 200,
    type: CurrencyEntity,
    isArray: true,
  })
  getKucoinCurrencies(): Observable<CurrencyDto[]> {
    return this.kucoinService.getKucoinCurrencies();
  }

  @ApiOperation({ summary: 'Получить активную сделку' })
  @Get('/userbid')
  @ApiQuery({ name: 'currency', enum: Currency })
  @ApiQuery({ name: 'type', enum: Type })
  @ApiQuery({ name: 'fiat', enum: Fiat })
  @ApiResponse({
    status: 200,
    type: KucoinEntity,
  })
  getKucoinUserBid(
    @Query('currency') currency: Currency,
    @Query('type') type: Type,
    @Query('fiat') fiat: Fiat,
  ): Observable<KucoinDto> {
    return this.kucoinService.getKucoinUserBid({
      currency: currency,
      type: type,
      fiat: fiat,
    });
  }
}
