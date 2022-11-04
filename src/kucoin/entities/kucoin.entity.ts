import { ApiProperty } from '@nestjs/swagger';

export class KucoinEntity {
  @ApiProperty({
    description: 'Тип сделки',
  })
  tradeType: string;

  @ApiProperty({
    description: 'Тип сделки',
  })
  payType: string;

  @ApiProperty({
    description: 'Валюта обмена',
  })
  tradeToken: string;

  @ApiProperty({
    description: 'Последний доступный обьем сделок',
  })
  balance: number;

  @ApiProperty({
    description: 'Минимальная сумма для совершения обмена',
  })
  minAmount: number;

  @ApiProperty({
    description: 'Минимальная сумма для совершения обмена',
  })
  maxAmount: number;
  @ApiProperty({
    example: ['WEBMONEY'],
    description: 'Используемые торговые платформы',
    isArray: true,
  })
  tradePlatform: string[];
}
