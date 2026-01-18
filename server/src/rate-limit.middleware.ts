import { Injectable, NestMiddleware, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import type { RedisClientType } from 'redis';
import { REDIS_CLIENT } from './redis/redis.module';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redis: RedisClientType,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const key = `rate:${Math.floor(Date.now() / 1000)}`;

      const count = await this.redis.incr(key);

      if (count === 1) {
        await this.redis.expire(key, 1);
      }

      if (count > 50) {
        throw new HttpException('Too Many Requests', HttpStatus.TOO_MANY_REQUESTS);
      }

      next();
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
