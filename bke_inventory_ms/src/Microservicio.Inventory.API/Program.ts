import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { configureCors } from './Extensions/CorsExtensions';
import { configureSwagger } from './Extensions/SwaggerExtensions';
import { buildServiceContainer } from './Extensions/ServiceCollectionExtensions';
import { exceptionHandlingMiddleware } from './Middleware/ExceptionHandlingMiddleware';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3001', 10);

app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));
app.use(express.json());

configureCors(app);
configureSwagger(app);
buildServiceContainer(app);

app.use(exceptionHandlingMiddleware);

app.listen(PORT, () => {
  console.log(`Inventory microservice running on port ${PORT}`);
  console.log(`Swagger docs: http://localhost:${PORT}/api-docs`);
});
