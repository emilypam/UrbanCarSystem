import { NextFunction, Request, Response, Router } from 'express';
import { ICategoriaService } from '../../Microservicio.Inventory.Business/Interfaces/ICategoriaService';
import { authorize, requireAuth } from '../Extensions/AuthenticationExtensions';
import { ok } from '../Models/ApiResponse';

export function createCategoriaRouter(service: ICategoriaService): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/categorias:
   *   get:
   *     summary: Listar categorías
   *     tags: [Categorias]
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
   *         description: Lista paginada de categorías
   */
  router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      res.json(ok(await service.getAll(page, pageSize)));
    } catch (e) { next(e); }
  });

  router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.getById(req.params.id))); } catch (e) { next(e); }
  });

  router.post('/', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.status(201).json(ok(await service.create(req.body), 'Categoría creada correctamente.')); } catch (e) { next(e); }
  });

  router.put('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.update(req.params.id, req.body), 'Categoría actualizada correctamente.')); } catch (e) { next(e); }
  });

  router.delete('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { await service.delete(req.params.id); res.json(ok(null, 'Categoría eliminada correctamente.')); } catch (e) { next(e); }
  });

  return router;
}
