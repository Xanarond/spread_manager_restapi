import { Module } from '@nestjs/common';
import { OkxController } from './okx.controller';
import { OkxService } from './okx.service';
import { HttpService } from '@nestjs/axios';

@Module({
  imports: [HttpService],
  controllers: [OkxController],
  providers: [OkxService],
})
export class OkxModule {}
