import { Global, Module, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: () => {
        const logger = new Logger('RedisModule');
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
        
        const client = new Redis(redisUrl, {
          retryStrategy: (times) => {
            if (times > 3) {
              logger.warn('Could not connect to Redis, disabling caching.');
              return null; // Stop retrying
            }
            return Math.min(times * 50, 2000);
          },
          maxRetriesPerRequest: 1,
        });

        client.on('error', (err) => {
          logger.warn(`Redis error: ${err.message}`);
        });

        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
