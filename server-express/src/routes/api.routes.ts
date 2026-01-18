import { Express, Request, Response } from 'express';

export function apiRoutes(app: Express) {
  app.get('/api', async (req: Request, res: Response) => {
    const index = req.query.index as string;
    const delay = Math.floor(Math.random() * 1000) + 1;

    await new Promise((resolve) => setTimeout(resolve, delay));

    res.json({ index: Number(index) });
  });
}
