import { IsInt, IsString } from 'class-validator';

export class BybitDto {
  @IsString()
  payType: string;

  @IsInt()
  minAmount: number;

  @IsString()
  quantity: string;

  @IsInt()
  recentExecuteRate: number;

  @IsString()
  price: string;

  @IsString()
  tokenName: string;

  @IsString()
  currencyId: string;

  @IsString()
  maxAmount: string;

  @IsInt()
  recentOrderNum: number;

  @IsString()
  lastQuantity: string;

  @IsString()
  tradeType: string;
}
