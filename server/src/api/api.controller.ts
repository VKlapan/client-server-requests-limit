// api.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('api')
  async handle(@Query('index') index: string) {
    return this.apiService.processIndex(index);
  }
}
