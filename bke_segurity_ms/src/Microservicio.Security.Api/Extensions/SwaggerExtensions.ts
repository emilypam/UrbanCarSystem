import { Application } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export function configureSwagger(app: Application): void {
  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Security Microservice API',
        version: '1.0.0',
        description:
          'API de seguridad para gestión de usuarios, roles y autenticación JWT. ' +
          'Parte del ecosistema de microservicios UrbanCar.',
        contact: { name: 'UrbanCar Team' },
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT || 3000}`,
          description: 'Servidor de desarrollo',
        },
      ],
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            description: 'Ingrese el token JWT: Bearer {token}',
          },
        },
      },
      security: [{ BearerAuth: [] }],
    },
    apis: ['./src/Microservicio.Security.Api/Controllers/**/*.ts'],
  };

  const spec = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));
  app.get('/api-docs.json', (_req, res) => res.json(spec));
}
