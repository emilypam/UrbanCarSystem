import { NextFunction, Request, Response, Router } from 'express';
import { IMarcaService } from '../../Microservicio.Inventory.Business/Interfaces/IMarcaService';
import { authorize, requireAuth } from '../Extensions/AuthenticationExtensions';
import { ok } from '../Models/ApiResponse';

export function createMarcaRouter(service: IMarcaService): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/marcas:
   *   get:
   *     summary: Listar marcas
   *     tags: [Marcas]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema: { type: integer, default: 1 }
   *       - in: query
   *         name: pageSize
   *         schema: { type: integer, default: 10 }
   *     responses:
   *       200:
   *         description: Lista paginada de marcas
   */
  router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const result = await service.getAll(page, pageSize);
      res.json(ok(result));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/marcas/{id}:
   *   get:
   *     summary: Obtener marca por ID
   *     tags: [Marcas]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Marca encontrada
   *       404:
   *         description: No encontrada
   */
  router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.getById(req.params.id);
      res.json(ok(result));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/marcas:
   *   post:
   *     summary: Crear marca
   *     tags: [Marcas]
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [nombre]
   *             properties:
   *               nombre: { type: string }
   *     responses:
   *       201:
   *         description: Marca creada
   */
  router.post('/', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.create(req.body);
      res.status(201).json(ok(result, 'Marca creada correctamente.'));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/marcas/{id}:
   *   put:
   *     summary: Actualizar marca
   *     tags: [Marcas]
   *     security: [{ bearerAuth: [] }]
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
   *             required: [nombre]
   *             properties:
   *               nombre: { type: string }
   *     responses:
   *       200:
   *         description: Marca actualizada
   */
  router.put('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await service.update(req.params.id, req.body);
      res.json(ok(result, 'Marca actualizada correctamente.'));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/marcas/{id}:
   *   delete:
   *     summary: Eliminar marca
   *     tags: [Marcas]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Marca eliminada
   */
  router.delete('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      await service.delete(req.params.id);
      res.json(ok(null, 'Marca eliminada correctamente.'));
    } catch (e) { next(e); }
  });

  return router;
}
