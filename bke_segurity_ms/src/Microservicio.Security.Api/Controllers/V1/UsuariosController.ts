import { Router, Request, Response, NextFunction } from 'express';
import { UsuarioService } from '../../../Microservicio.Security.Business/Services/UsuarioService';
import { AuthService } from '../../../Microservicio.Security.Business/Services/AuthService';
import { createApiResponse } from '../../Models/Common/ApiResponse';
// Importamos todo de tu archivo de extensiones
import { createAuthMiddleware, requireRoles } from '../../Extensions/AuthenticationExtensions';
import { BusinessException } from '../../../Microservicio.Security.Business/Exceptions/BusinessException';

export function createUsuariosController(
  usuarioService: UsuarioService,
  authService: AuthService
): Router {
  const router = Router();

  // Validamos que el servicio llegue para evitar el error de 'null'
  if (!authService) {
    console.error('❌ Error: authService no llegó al controlador.');
    return router;
  }

  const authenticate = createAuthMiddleware(authService);

  /**
   * Listar todos (Solo ADMIN)
   */
  router.get('/', authenticate, requireRoles('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
      const pageSize = Math.min(100, Math.max(1, parseInt(req.query['pageSize'] as string) || 10));
      const result = await usuarioService.getAll(page, pageSize);
      res.status(200).json(createApiResponse(result));
    } catch (err) {
      next(err);
    }
  });

  /**
   * Obtener por ID (Admin o el propio usuario)
   */
  router.get('/:id', authenticate, requireRoles('ADMIN', 'CLIENTE'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logueado = req.currentUser; // Usamos tu currentUser
      const idABuscar = req.params['id']!;

      if (logueado?.roles.includes('CLIENTE') && logueado.usuarioId !== idABuscar) {
        throw new BusinessException('No tienes permiso para ver este perfil.', 403);
      }

      const usuario = await usuarioService.getById(idABuscar);
      res.status(200).json(createApiResponse(usuario));
    } catch (err) {
      next(err);
    }
  });

  /**
   * Registrar (Solo ADMIN)
   */
  router.post('/', authenticate, requireRoles('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const usuario = await usuarioService.create(req.body);
      res.status(201).json(createApiResponse(usuario, 'Usuario creado.'));
    } catch (err) {
      next(err);
    }
  });

  /**
   * Actualizar (Admin o dueño)
   */
  router.put('/:id', authenticate, requireRoles('ADMIN', 'CLIENTE'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const logueado = req.currentUser;
      const idAActualizar = req.params['id']!;

      if (logueado?.roles.includes('CLIENTE') && logueado.usuarioId !== idAActualizar) {
        throw new BusinessException('No puedes editar perfiles ajenos.', 403);
      }

      const usuario = await usuarioService.update(idAActualizar, req.body);
      res.status(200).json(createApiResponse(usuario));
    } catch (err) {
      next(err);
    }
  });

  /**
   * Eliminar (Solo ADMIN)
   */
  router.delete('/:id', authenticate, requireRoles('ADMIN'), async (req: Request, res: Response, next: NextFunction) => {
    try {
      await usuarioService.delete(req.params['id']!);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}