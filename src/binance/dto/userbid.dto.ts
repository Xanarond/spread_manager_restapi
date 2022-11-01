import { IsInt, IsString } from 'class-validator';

export default class UserBid {
  @IsString()
  payType: string;

  @IsString()
  tradeType: string;

  @IsString()
  publisherType: string;

  @IsInt()
  amountAfterEditing: number;

  @IsInt()
  price: number;

  @IsString()
  asset: string;

  @IsString()
  fiatUnit: string;

  @IsInt()
  minSingleTransAmount: number;

  @IsInt()
  maxSingleTransAmount: number;

  @IsInt()
  tradableAmount: number;
}
