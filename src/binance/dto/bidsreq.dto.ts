import { IsInt, IsObject, IsString, IsBoolean } from 'class-validator';

export class BidsReq {
  @IsInt()
  page: number;

  @IsInt()
  rows: number;

  @IsObject()
  payTypes: any[string];

  @IsObject()
  countries: any[string];

  @IsString()
  publisherType: string;

  @IsString()
  asset: string;

  @IsString()
  fiat: string;

  @IsString()
  tradeType: string;

  @IsString()
  transAmount: string;

  @IsBoolean()
  proMerchantAds: boolean;
}
