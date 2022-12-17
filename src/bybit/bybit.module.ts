import { Module } from '@nestjs/common';
import { BybitService } from './bybit.service';
import { BybitController } from './bybit.controller';
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
  providers: [BybitService],
  controllers: [BybitController],
})
export class BybitModule {}
