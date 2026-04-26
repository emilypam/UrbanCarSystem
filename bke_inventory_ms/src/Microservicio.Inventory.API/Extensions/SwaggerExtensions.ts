import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function configureSwagger(app: Express): void {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: { title: 'Inventory Microservice API', version: '1.0.0' },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
      security: [{ bearerAuth: [] }],
    },
    apis: ['./src/Microservicio.Inventory.API/Controllers/*.ts'],
  };
  const spec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec));
}
