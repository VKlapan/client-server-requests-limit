import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ApiModule } from './api/api.module';
import { ApiService } from './api/api.service';
import { RateLimitMiddleware } from './rate-limit.middleware';

@Module({
  imports: [RedisModule, ApiModule],
  controllers: [AppController],
  providers: [AppService, ApiService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RateLimitMiddleware).forRoutes('/api');
  }
}
