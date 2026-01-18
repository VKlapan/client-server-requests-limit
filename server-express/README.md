# Server Express

Express-based REST API server with Redis rate limiting.

## Features

- Express.js framework
- Redis-based rate limiting (50 requests per second)
- Random response delay (1-1000ms)
- TypeScript support
- Docker support

## Installation

```bash
npm install
```

## Development

```bash
npm run start:dev
```

## Production

```bash
npm run build
npm run start:prod
```

## Testing

```bash
npm test
npm run test:e2e
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `REDIS_HOST` - Redis host (default: localhost)
- `REDIS_PORT` - Redis port (default: 6379)
- `NODE_ENV` - Environment (default: development)
