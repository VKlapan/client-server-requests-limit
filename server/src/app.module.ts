import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { ApiModule } from './api/api.module';
import { ApiController } from './api/api.controller';

@Module({
  imports: [RedisModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
