import { IsInt, IsString } from 'class-validator';

export class BybitDto {
  @IsString()
  payType: string;

  @IsInt()
  minAmount: number;

  @IsInt()
  quantity: number;

  @IsInt()
  recentExecuteRate: number;

  @IsInt()
  price: number;

  @IsString()
  tokenName: string;

  @IsString()
  currencyId: string;

  @IsInt()
  maxAmount: number;

  @IsInt()
  recentOrderNum: number;

  @IsInt()
  lastQuantity: number;

  @IsString()
  tradeType: string;
}
