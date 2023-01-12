import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceModule } from './binance/binance.module';
import { KucoinModule } from './kucoin/kucoin.module';
import { BybitModule } from './bybit/bybit.module';
import { OkxModule } from './okx/okx.module';

@Module({
  imports: [BinanceModule, BybitModule, KucoinModule, OkxModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
