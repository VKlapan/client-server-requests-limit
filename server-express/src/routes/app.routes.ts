import { Express, Request, Response } from 'express';
import { getHello } from '../services/app.service';

export function appRoutes(app: Express) {
  app.get('/', (req: Request, res: Response) => {
    res.send(getHello());
  });
}
