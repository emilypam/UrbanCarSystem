import 'dotenv/config';
import express, { Application } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { buildServiceContainer } from './Extensions/ServiceCollectionExtensions';
import { configureCors } from './Extensions/CorsExtensions';
import { configureSwagger } from './Extensions/SwaggerExtensions';
import { exceptionHandlingMiddleware } from './Middleware/ExceptionHandlingMiddleware';
import { createAuthController } from './Controllers/V1/AuthController';
import { createUsuariosController } from './Controllers/V1/UsuariosController';
import { createRolesPermisosController } from './Controllers/V1/RolesPermisosController';
import { createUsuarioRolesController } from './Controllers/V1/UsuarioRolesController';

async function bootstrap(): Promise<void> {
  const app: Application = express();
  const port = parseInt(process.env['PORT'] || '3000', 10);

  // Seguridad HTTP headers
  app.use(helmet());

  // Rate limiting global
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 200,
      standardHeaders: true,
      legacyHeaders: false,
      message: { success: false, message: 'Demasiadas solicitudes. Intente más tarde.' },
    })
  );

  // Body parsing
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // CORS
  configureCors(app);

  // Swagger UI
  configureSwagger(app);

  // Health check (sin autenticación)
  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      service: 'bke_segurity_ms',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    });
  });

  // Composición de servicios (DI manual)
  const container = buildServiceContainer();

  // Rutas versionadas
  const apiV1 = '/api/v1';
  app.use(`${apiV1}/auth`, createAuthController(container.authService));
  app.use(`${apiV1}/usuarios`, createUsuariosController(container.usuarioService, container.authService));
  app.use(
    `${apiV1}/roles-permisos`,
    createRolesPermisosController(container.rolPermisoService, container.authService)
  );
  app.use(
    `${apiV1}/usuario-roles`,
    createUsuarioRolesController(container.usuarioRolService, container.authService)
  );

  // Middleware global de manejo de excepciones (debe ser el último)
  app.use(exceptionHandlingMiddleware);

  // Iniciar servidor
  const server = app.listen(port, () => {
    console.log(`\n[Security MS] Servidor corriendo en http://localhost:${port}`);
    console.log(`[Security MS] Swagger UI:       http://localhost:${port}/api-docs`);
    console.log(`[Security MS] Health check:     http://localhost:${port}/health`);
    console.log(`[Security MS] Entorno:          ${process.env['NODE_ENV'] || 'development'}\n`);
  });

  // Graceful shutdown
  const gracefulShutdown = async (signal: string): Promise<void> => {
    console.log(`\n[Security MS] Señal ${signal} recibida. Cerrando servidor...`);
    server.close(async () => {
      await container.prisma.$disconnect();
      console.log('[Security MS] Servidor cerrado correctamente.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
}

bootstrap().catch((err: Error) => {
  console.error('[Security MS] Error fatal al iniciar:', err.message);
  process.exit(1);
});
