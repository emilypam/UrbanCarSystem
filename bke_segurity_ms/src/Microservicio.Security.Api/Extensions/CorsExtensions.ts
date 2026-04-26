import cors from 'cors';
import { Application } from 'express';

export function configureCors(app: Application): void {
  const origins = (process.env.CORS_ORIGINS || 'http://localhost:3000').split(',').map((o) => o.trim());

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || origins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error(`Origen '${origin}' no permitido por CORS.`));
        }
      },
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );
}
