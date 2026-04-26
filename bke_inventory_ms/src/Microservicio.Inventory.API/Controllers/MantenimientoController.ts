import { NextFunction, Request, Response, Router } from 'express';
import { IMantenimientoService } from '../../Microservicio.Inventory.Business/Interfaces/IMantenimientoService';
import { authorize, requireAuth } from '../Extensions/AuthenticationExtensions';
import { ok } from '../Models/ApiResponse';

export function createMantenimientoRouter(service: IMantenimientoService): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/mantenimientos:
   *   get:
   *     summary: Listar mantenimientos paginados
   *     tags: [Mantenimientos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema: { type: integer, default: 1 }
   *       - in: query
   *         name: pageSize
   *         schema: { type: integer, default: 10 }
   *       - in: query
   *         name: vehiculoId
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Lista paginada de mantenimientos
   */
  router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const vehiculoId = req.query.vehiculoId as string | undefined;
      res.json(ok(await service.getAll(page, pageSize, vehiculoId)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/mantenimientos/vehiculo/{vehiculoId}:
   *   get:
   *     summary: Historial de mantenimientos de un vehículo
   *     tags: [Mantenimientos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: vehiculoId
   *         required: true
   *         schema: { type: string, format: uuid }
   *       - in: query
   *         name: page
   *         schema: { type: integer, default: 1 }
   *       - in: query
   *         name: pageSize
   *         schema: { type: integer, default: 50 }
   *     responses:
   *       200:
   *         description: Historial de mantenimientos del vehículo
   */
  router.get('/vehiculo/:vehiculoId', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 50;
      res.json(ok(await service.getAll(page, pageSize, req.params.vehiculoId)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/mantenimientos/{id}:
   *   get:
   *     summary: Obtener mantenimiento por ID
   *     tags: [Mantenimientos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Mantenimiento encontrado
   *       404:
   *         description: No encontrado
   */
  router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.getById(req.params.id))); } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/mantenimientos:
   *   post:
   *     summary: Registrar mantenimiento (ADMIN)
   *     tags: [Mantenimientos]
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [fecha, descripcion]
   *             properties:
   *               vehiculoId: { type: string, format: uuid }
   *               fecha: { type: string, format: date }
   *               descripcion: { type: string }
   *               costo: { type: number }
   *               siguienteKm: { type: integer }
   *     responses:
   *       201:
   *         description: Mantenimiento registrado
   *       403:
   *         description: Acceso denegado
   */
  router.post('/', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(ok(await service.create(req.body), 'Mantenimiento registrado correctamente.')); } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/mantenimientos/{id}:
   *   put:
   *     summary: Actualizar mantenimiento (ADMIN)
   *     tags: [Mantenimientos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Mantenimiento actualizado
   *       403:
   *         description: Acceso denegado
   */
  router.put('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.update(req.params.id, req.body), 'Mantenimiento actualizado correctamente.')); } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/mantenimientos/{id}:
   *   delete:
   *     summary: Eliminar mantenimiento (ADMIN)
   *     tags: [Mantenimientos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Mantenimiento eliminado
   *       403:
   *         description: Acceso denegado
   */
  router.delete('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { await service.delete(req.params.id); res.json(ok(null, 'Mantenimiento eliminado correctamente.')); } catch (e) { next(e); }
  });

  return router;
}
