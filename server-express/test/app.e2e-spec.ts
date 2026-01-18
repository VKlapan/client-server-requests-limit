import request from 'supertest';
import express, { Express } from 'express';
import { createClient } from 'redis';
import { rateLimitMiddleware } from '../src/middleware/rate-limit.middleware';
import { appRoutes } from '../src/routes/app.routes';
import { apiRoutes } from '../src/routes/api.routes';

describe('Express Server (e2e)', () => {
  let app: Express;
  let redisClient: any;

  beforeAll(async () => {
    // Initialize Redis
    const redisHost = process.env.REDIS_HOST || 'localhost';
    const redisPort = parseInt(process.env.REDIS_PORT || '6379');
    redisClient = createClient({ url: `redis://${redisHost}:${redisPort}` });

    try {
      await redisClient.connect();
    } catch (error) {
      console.warn('Could not connect to Redis, tests will run without rate limiting');
    }
  });

  beforeEach(() => {
    app = express();

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

    // Rate limit middleware
    if (redisClient && redisClient.isOpen) {
      app.use(rateLimitMiddleware(redisClient));
    }

    // Routes
    appRoutes(app);
    apiRoutes(app);
  });

  afterAll(async () => {
    if (redisClient && redisClient.isOpen) {
      await redisClient.quit();
    }
  });

  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/api (GET)', () => {
    return request(app)
      .get('/api?index=1')
      .expect(200)
      .expect((res) => {
        if (typeof res.body.index !== 'number' || res.body.index !== 1) {
          throw new Error('Expected index to be 1');
        }
      });
  });
});
