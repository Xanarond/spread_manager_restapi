import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
import { KucoinModule } from './kucoin/kucoin/kucoin.module';
import { BybitModule } from './bybit/bybit/bybit.module';

@Module({
  imports: [BinanceModule, KucoinModule, BybitModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
