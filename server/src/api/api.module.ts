import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { RedisModule } from '../redis/redis.module';
import { RateLimitGuard } from '../rate-limit.guard';

@Module({
	imports: [RedisModule],
	controllers: [ApiController],
	providers: [RateLimitGuard],
})
export class ApiModule {}
