import { NextFunction, Request, Response, Router } from 'express';
import { IModeloService } from '../../Microservicio.Inventory.Business/Interfaces/IModeloService';
import { authorize, requireAuth } from '../Extensions/AuthenticationExtensions';
import { ok } from '../Models/ApiResponse';

export function createModeloRouter(service: IModeloService): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/modelos:
   *   get:
   *     summary: Listar modelos
   *     tags: [Modelos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema: { type: integer, default: 1 }
   *       - in: query
   *         name: pageSize
   *         schema: { type: integer, default: 10 }
   *       - in: query
   *         name: marcaId
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Lista paginada de modelos
   */
  router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const marcaId = req.query.marcaId as string | undefined;
      res.json(ok(await service.getAll(page, pageSize, marcaId)));
    } catch (e) { next(e); }
  });

  router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.getById(req.params.id))); } catch (e) { next(e); }
  });

  router.post('/', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(ok(await service.create(req.body), 'Modelo creado correctamente.')); } catch (e) { next(e); }
  });

  router.put('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.update(req.params.id, req.body), 'Modelo actualizado correctamente.')); } catch (e) { next(e); }
  });

  router.delete('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { await service.delete(req.params.id); res.json(ok(null, 'Modelo eliminado correctamente.')); } catch (e) { next(e); }
  });

  return router;
}
