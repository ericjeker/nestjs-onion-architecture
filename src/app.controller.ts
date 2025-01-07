import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get('up')
  up(): boolean {
    return true;
  }
}
