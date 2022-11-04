import { IsArray, IsInt, IsString } from 'class-validator';

export class KucoinDto {
  @IsString()
  tradeType: string;

  @IsString()
  payType: string;

  @IsString()
  tradeToken: string;

  @IsInt()
  balance: number;

  @IsInt()
  price: number;

  @IsInt()
  minAmount: number;

  @IsInt()
  maxAmount: number;

  @IsArray()
  @IsString()
  tradePlatform: string[];
}
