import { Router, Request, Response, NextFunction } from 'express';
import { RolPermisoService } from '../../../Microservicio.Security.Business/Services/RolPermisoService';
import { AuthService } from '../../../Microservicio.Security.Business/Services/AuthService';
import { createApiResponse } from '../../Models/Common/ApiResponse';
import { createAuthMiddleware } from '../../Extensions/AuthenticationExtensions';

/**
 * @swagger
 * tags:
 *   name: RolesPermisos
 *   description: Gestión de roles y permisos del sistema
 */
export function createRolesPermisosController(
  rolPermisoService: RolPermisoService,
  authService: AuthService
): Router {
  const router = Router();
  const authenticate = createAuthMiddleware(authService);

  /**
   * @swagger
   * /api/v1/roles-permisos:
   *   get:
   *     summary: Listar roles con paginación
   *     tags: [RolesPermisos]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: query
   *         name: page
   *         schema: { type: integer, default: 1 }
   *       - in: query
   *         name: pageSize
   *         schema: { type: integer, default: 10 }
   *     responses:
   *       200:
   *         description: Lista paginada de roles
   */
  router.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Math.max(1, parseInt(req.query['page'] as string) || 1);
      const pageSize = Math.min(100, Math.max(1, parseInt(req.query['pageSize'] as string) || 10));
      const result = await rolPermisoService.getAll(page, pageSize);
      res.status(200).json(createApiResponse(result));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/roles-permisos/{id}:
   *   get:
   *     summary: Obtener un rol por ID
   *     tags: [RolesPermisos]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Rol encontrado
   *       404:
   *         description: Rol no encontrado
   */
  router.get('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rol = await rolPermisoService.getById(req.params['id']!);
      res.status(200).json(createApiResponse(rol));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/roles-permisos:
   *   post:
   *     summary: Crear un nuevo rol
   *     tags: [RolesPermisos]
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nombre]
   *             properties:
   *               nombre:
   *                 type: string
   *                 maxLength: 50
   *                 example: ADMIN
   *               descripcion:
   *                 type: string
   *                 example: Administrador del sistema
   *     responses:
   *       201:
   *         description: Rol creado exitosamente
   *       422:
   *         description: Error de validación
   */
  router.post('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rol = await rolPermisoService.create(req.body);
      res.status(201).json(createApiResponse(rol, 'Rol creado exitosamente.'));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/roles-permisos/{id}:
   *   put:
   *     summary: Actualizar un rol
   *     tags: [RolesPermisos]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nombre: { type: string }
   *               descripcion: { type: string }
   *     responses:
   *       200:
   *         description: Rol actualizado
   *       404:
   *         description: Rol no encontrado
   */
  router.put('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rol = await rolPermisoService.update(req.params['id']!, req.body);
      res.status(200).json(createApiResponse(rol, 'Rol actualizado exitosamente.'));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/roles-permisos/{id}:
   *   delete:
   *     summary: Eliminar un rol
   *     tags: [RolesPermisos]
   *     security:
   *       - BearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       204:
   *         description: Rol eliminado
   *       404:
   *         description: Rol no encontrado
   */
  router.delete('/:id', authenticate, async (req: Request, res: Response, next: NextFunction) => {
    try {
      await rolPermisoService.delete(req.params['id']!);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  });

  return router;
}
