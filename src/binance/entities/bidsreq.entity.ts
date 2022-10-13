import { ApiProperty } from '@nestjs/swagger';

export class BinanceBidEntity {
  @ApiProperty({
    example: 1,
    description: 'Страница API',
  })
  page = 1;

  @ApiProperty({
    example: 20,
    description: 'Количество полей',
  })
  rows = 10;

  @ApiProperty({
    example: ['TinkoffNew'],
    description: 'Тип платежной системы. Подавать одну в массиве',
  })
  payTypes: any[string] = ['Tinkoff'];

  @ApiProperty({
    example: ['RU'],
    description: 'Страна. Подавать одну в массиве',
  })
  countries: any[string] = [];

  @ApiProperty({
    example: 'merchant' || null,
    description: 'Тип сделки. Мерчант, либо оставить поле пустым',
  })
  publisherType: string | null = null;

  @ApiProperty({ example: 'USDT', description: 'Тип валюты обмена' })
  asset = 'USDT';

  @ApiProperty({ example: 'RUB', description: 'Вид фиатной валюты' })
  fiat = 'RUB';

  @ApiProperty({ example: 'BUY', description: 'Вид сделки' })
  tradeType = 'BUY';

  /*@ApiProperty({
    example: true,
    description: 'Проверка на мерчанта. Опциональный параметр',
  })
  private _merchantCheck = true;*/

  @ApiProperty({ example: 10000, description: 'Сумма для обмена' })
  transAmount = '';

  @ApiProperty({
    example: false,
    description: 'Показывать объявления только от мерчантов PRO',
  })
  proMerchantAds = false;
}
