import { Router, Request, Response, NextFunction } from 'express';
import { UsuarioRolService } from '../../../Microservicio.Security.Business/Services/UsuarioRolService';
import { AuthService } from '../../../Microservicio.Security.Business/Services/AuthService';
import { createApiResponse } from '../../Models/Common/ApiResponse';
import { createAuthMiddleware } from '../../Extensions/AuthenticationExtensions';

/**
 * @swagger
 * tags:
 *   name: UsuarioRoles
 *   description: Asignación y revocación de roles a usuarios
 */
export function createUsuarioRolesController(
  usuarioRolService: UsuarioRolService,
  authService: AuthService
): Router {
  const router = Router();
  const authenticate = createAuthMiddleware(authService);

  /**
   * @swagger
   * /api/v1/usuario-roles/{usuarioId}:
   *   get:
   *     summary: Obtener los roles asignados a un usuario
   *     tags: [UsuarioRoles]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: usuarioId
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Lista de roles del usuario
   *       404:
   *         description: Usuario no encontrado
   */
  router.get('/:usuarioId', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = await usuarioRolService.getByUsuarioId(req.params['usuarioId']!);
      res.status(200).json(createApiResponse(roles));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/usuario-roles:
   *   post:
   *     summary: Asignar un rol a un usuario
   *     tags: [UsuarioRoles]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [usuarioId, rolId]
   *             properties:
   *               usuarioId:
   *                 type: string
   *                 format: uuid
   *               rolId:
   *                 type: string
   *                 format: uuid
   *     responses:
   *       201:
   *         description: Rol asignado exitosamente
   *       404:
   *         description: Usuario o rol no encontrado
   *       409:
   *         description: El usuario ya tiene este rol asignado
   */
  router.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usuarioRolService.asignarRol(req.body);
      res.status(201).json(createApiResponse(result, 'Rol asignado exitosamente.'));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/usuario-roles/{usuarioId}/{rolId}:
   *   delete:
   *     summary: Remover un rol de un usuario
   *     tags: [UsuarioRoles]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: usuarioId
   *         required: true
   *         schema: { type: string, format: uuid }
   *       - in: path
   *         name: rolId
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       204:
   *         description: Rol removido exitosamente
   *       404:
   *         description: Asignación no encontrada
   */
  router.delete(
    '/:usuarioId/:rolId',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await usuarioRolService.removerRol(req.params['usuarioId']!, req.params['rolId']!);
        res.status(204).send();
      } catch (err) {
        next(err);
      }
    }
  );

  return router;
}
