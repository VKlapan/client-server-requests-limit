// api.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RateLimitGuard } from '../rate-limit.guard';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) {}
  @Get('api')
  @UseGuards(RateLimitGuard)
  async handle(@Query('index') index: string) {
    return this.apiService.processIndex(index);
  }
}
