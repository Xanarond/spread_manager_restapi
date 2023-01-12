import { Module } from '@nestjs/common';
import { OkxController } from './okx.controller';
import { OkxService } from './okx.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [OkxController],
  providers: [OkxService],
})
export class OkxModule {}
