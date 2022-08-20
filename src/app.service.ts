import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getConnect(): string {
    return 'You connected to the Spread Manager API';
  }
}
