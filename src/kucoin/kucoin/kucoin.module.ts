import { Module } from '@nestjs/common';
import { KucoinController } from './kucoin.controller';
import { KucoinService } from './kucoin.service';

@Module({
  controllers: [KucoinController],
  providers: [KucoinService],
})
export class KucoinModule {}
