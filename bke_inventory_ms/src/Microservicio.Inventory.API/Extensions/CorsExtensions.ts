import cors from 'cors';
import { Express } from 'express';

export function configureCors(app: Express): void {
  app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));
}
