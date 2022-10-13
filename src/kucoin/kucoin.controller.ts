import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Kucoin Requests')
@Controller('kucoin')
export class KucoinController {}
