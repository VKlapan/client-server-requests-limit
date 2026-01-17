// rate-limit.guard.ts
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import type { RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis/redis.module';

@Injectable()
export class RateLimitGuard implements CanActivate {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: RedisClientType,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const key = `rate:${Math.floor(Date.now() / 1000)}`;

    const count = await this.redis.incr(key);

    if (count === 1) {
      await this.redis.expire(key, 1);
    }

    if (count > 2) {
      throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
    }

    return true;
  }
}
