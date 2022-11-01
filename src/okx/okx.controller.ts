import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('okx')
@ApiTags('OKX Requests')
export class OkxController {}
