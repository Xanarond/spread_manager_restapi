import { Module } from '@nestjs/common';
import { KucoinController } from './kucoin.controller';
import { KucoinService } from './kucoin.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 10000,
        maxRedirects: 5,
      }),
    }),
  ],
  controllers: [KucoinController],
  providers: [KucoinService],
})
export class KucoinModule {}
