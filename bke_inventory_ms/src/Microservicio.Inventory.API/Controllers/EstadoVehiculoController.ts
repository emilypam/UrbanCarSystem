import { NextFunction, Request, Response, Router } from 'express';
import { IEstadoVehiculoService } from '../../Microservicio.Inventory.Business/Interfaces/IEstadoVehiculoService';
import { authorize, requireAuth } from '../Extensions/AuthenticationExtensions';
import { ok } from '../Models/ApiResponse';

export function createEstadoVehiculoRouter(service: IEstadoVehiculoService): Router {
  const router = Router();

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
    try { res.status(201).json(ok(await service.create(req.body), 'Estado de vehículo creado correctamente.')); } catch (e) { next(e); }
  });

  router.put('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { res.json(ok(await service.update(req.params.id, req.body), 'Estado de vehículo actualizado correctamente.')); } catch (e) { next(e); }
  });

  router.delete('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try { await service.delete(req.params.id); res.json(ok(null, 'Estado de vehículo eliminado correctamente.')); } catch (e) { next(e); }
  });

  return router;
}
