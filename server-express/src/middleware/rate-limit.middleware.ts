import { Request, Response, NextFunction } from 'express';

export function rateLimitMiddleware(redisClient: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const key = `rate:${Math.floor(Date.now() / 1000)}`;

      const count = await redisClient.incr(key);

      if (count === 1) {
        await redisClient.expire(key, 1);
      }

      if (count > 50) {
        return res.status(429).json({ message: 'Too Many Requests' });
      }

      next();
    } catch (error) {
      console.error('Rate limit middleware error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
}
