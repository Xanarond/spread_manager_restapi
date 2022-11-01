import { ApiProperty } from '@nestjs/swagger';

export default class UserbidEntity {
  get publisherType(): string {
    return this._publisherType;
  }
  get tradableAmount(): number {
    return this._tradableAmount;
  }

  set tradableAmount(value: number) {
    this._tradableAmount = value;
  }
  get maxSingleTransAmount(): number {
    return this._maxSingleTransAmount;
  }

  set maxSingleTransAmount(value: number) {
    this._maxSingleTransAmount = value;
  }
  get minSingleTransAmount(): number {
    return this._minSingleTransAmount;
  }

  set minSingleTransAmount(value: number) {
    this._minSingleTransAmount = value;
  }
  get fiatUnit(): string {
    return this._fiatUnit;
  }

  set fiatUnit(value: string) {
    this._fiatUnit = value;
  }

  get asset(): string {
    return this._asset;
  }

  set asset(value: string) {
    this._asset = value;
  }
  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }
  get payType(): string {
    return this._payType;
  }

  set payType(value: string) {
    this._payType = value;
  }
  get amountAfterEditing(): number {
    return this._amountAfterEditing;
  }

  set amountAfterEditing(value: number) {
    this._amountAfterEditing = value;
  }
  @ApiProperty({
    description:
      'объём после совершенной сделки если не ликвидировали ордер полностью',
  })
  private _amountAfterEditing: number;

  @ApiProperty({
    description: 'Тип сделки',
  })
  private _payType: string;

  @ApiProperty({
    description: 'Тип сделки мерчант/немерчант',
  })
  private _publisherType: string;

  @ApiProperty({
    description: 'Тип сделки мерчант/немерчант',
  })
  private _tradeType: string;

  @ApiProperty({
    description: 'Текущая цена покупки/продажи',
  })
  private _price: number;

  @ApiProperty({
    description: 'доступная сумма для сделки',
  })
  private _tradableAmount: number;

  @ApiProperty({
    description: 'валюта обмена',
  })
  private _asset: string;

  @ApiProperty({
    description: 'Тип единиц фиатной валюты на обмен',
  })
  private _fiatUnit: string;

  @ApiProperty({
    description: 'Минимальная сумма для совершения обмена',
  })
  private _minSingleTransAmount: number;

  @ApiProperty({
    description: 'Максимальная сумма для совершения обмена',
  })
  private _maxSingleTransAmount: number;
}
