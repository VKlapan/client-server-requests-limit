import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import { createClient } from 'redis';
import { rateLimitMiddleware } from './middleware/rate-limit.middleware';
import { appRoutes } from './routes/app.routes';
import { apiRoutes } from './routes/api.routes';

// Load .env file for local development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

let redisClient: any;

async function initializeRedis() {
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = parseInt(process.env.REDIS_PORT || '6379');
  redisClient = createClient({ url: `redis://${redisHost}:${redisPort}` });
  await redisClient.connect();
}

async function bootstrap() {
  try {
    // Initialize Redis
    await initializeRedis();

    const app: Express = express();

    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // CORS
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
      }
      next();
    });

    // Rate limit middleware (attach redis client)
    app.use(rateLimitMiddleware(redisClient));

    // Routes
    appRoutes(app);
    apiRoutes(app);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

export { redisClient };
