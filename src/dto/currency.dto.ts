import { IsInt, IsString } from 'class-validator';

export default class CurrencyDto {
  @IsString()
  symbol: string;

  @IsString()
  price: number;
}
