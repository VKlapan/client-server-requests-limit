### Usage

## Installation

1. Clone the repository
2. Installation:

CLIENT:
[CLIENT](./client/README.md#installation)

SERVER:
[NESTJS SERVER](./server/README.md#installation)
or
[EXPRESS SERVER](./server-express/README.md#installation)

## Local Development
1. Run up Redis server

```bash
docker run -p 6379:6379 redis
```

2. Run Client:
[CLIENT](./client/README.md#local-development)

3. Run Server:
[NESTJS SERVER](./server/README.md#local-development)
or
[EXPRESS SERVER](./server-express/README.md#local-development)

4. Use Exposed Services:
http://localhost:5173 => client
http://localhost:3000 => server


## Docker version
All Docker-related commands are defined in the `Makefile`.
To see all:
```bash
make
```






### The Task

Implement client-server data fetch logic by following the next steps:

1. Display an input (required, type number, from 0 to 100) and the "Start" button. Clicking the "Start" button you will disable it and start sending 1000 asynchronous HTTP requests to a server's "/api" endpoint in the following way:
   1. The input value should be used as a concurrency limit, e.g. if concurrency is 10 - you should always have 10 active requests in your browser network console.
   2. The input value should be used as requests limit per second, e.g. 10 requests per second.
   3. Send a request index (1, 2, 3, ....) to a server
2. Server-side logic should handle requests to "/api" endpoint:
   1. Make a random delay before sending a response: from 1ms to 1000ms
   2. A successful response data should be an index from a request
   3. Return 429-code error response if received more than 50 requests per second
3. Client-side JS should render the results of server responses (request indexes) to one list immediately after each response

Technology stack:

- **Language**: TypeScript 
- **Frontend**: ReactJS
- **Backend** (one of): NestJS / Koa / Express
- **Storage:** Redis (to manage server-side request limits)
- **Environment**: Docker Compose
  - NodeJS container
  - Redis container
- **Build (optional)**: Makefile (use GNU Make to write simple instructions to build and run Docker containers):
  - make up - build project and up containers
  - make down - stop containers