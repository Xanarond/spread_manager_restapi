import { IsInt, IsString } from 'class-validator';

export default class CurrencyDto {
  @IsString()
  symbol: string;

  @IsInt()
  price: number;
}
