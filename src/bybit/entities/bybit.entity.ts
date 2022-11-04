import { ApiProperty } from '@nestjs/swagger';

export class BybitEntity {
  get recentOrderNum(): number {
    return this._recentOrderNum;
  }
  get tradeType(): string {
    return this._tradeType;
  }
  get lastQuantity(): number {
    return this._lastQuantity;
  }
  get maxAmount(): number {
    return this._maxAmount;
  }
  get currencyId(): string {
    return this._currencyId;
  }
  get tokenName(): string {
    return this._tokenName;
  }
  get price(): number {
    return this._price;
  }
  get recentExecuteRate(): number {
    return this._recentExecuteRate;
  }
  get quantity(): number {
    return this._quantity;
  }
  get payType(): string {
    return this._payType;
  }
  get minAmount(): number {
    return this._minAmount;
  }

  @ApiProperty({
    description: 'Тип сделки',
  })
  private _payType: string;

  @ApiProperty({
    description: 'Минимальная сумма для совершения обмена',
  })
  private _minAmount: number;

  @ApiProperty({
    description: 'Доступное количество для обмена',
  })
  private _quantity: number;

  @ApiProperty({
    description: 'Текущий рейтинг обмена пользователя',
  })
  private _recentExecuteRate: number;

  @ApiProperty({
    description: 'Текущая цена покупки/продажи',
  })
  private _price: number;

  @ApiProperty({
    description: 'Валюта обмена',
  })
  private _tokenName: string;

  @ApiProperty({
    description: 'Тип единиц фиатной валюты на обмен',
  })
  private _currencyId: string;

  @ApiProperty({
    description: 'Максимальная сумма для совершения обмена',
  })
  private _maxAmount: number;

  @ApiProperty({
    description: 'Количество совершенных сделок пользователем',
  })
  private _recentOrderNum: number;

  @ApiProperty({
    description: 'Последний доступный обьем сделок',
  })
  private _lastQuantity: number;

  @ApiProperty({
    description: 'Тип сделки',
  })
  private _tradeType: string;
}
