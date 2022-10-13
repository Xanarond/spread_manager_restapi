import { ApiProperty } from '@nestjs/swagger';

export default class CurrencyEntity {
  @ApiProperty({
    description: 'Валютная пара',
  })
  symbol: string;

  @ApiProperty({
    description: 'Текущая цена',
  })
  price: number;
}
