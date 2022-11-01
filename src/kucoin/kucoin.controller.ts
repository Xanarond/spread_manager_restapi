import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { KucoinService } from './kucoin.service';
import CurrencyEntity from '../entities/currency.entity';
import CurrencyDto from '../dto/currency.dto';

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
}
