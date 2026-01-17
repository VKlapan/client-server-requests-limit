// api.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { RateLimitGuard } from '../rate-limit.guard';

@Controller()
export class ApiController {
  @Get('api')
  @UseGuards(RateLimitGuard)
  async handle(@Query('index') index: string) {
    const delay = Math.floor(Math.random() * 1000) + 1;

    await new Promise((res) => setTimeout(res, delay));

    return { index: Number(index) };
  }
}
