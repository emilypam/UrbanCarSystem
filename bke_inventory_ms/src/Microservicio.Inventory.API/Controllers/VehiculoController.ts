import { NextFunction, Request, Response, Router } from 'express';
import { ICategoriaService } from '../../Microservicio.Inventory.Business/Interfaces/ICategoriaService';
import { IMarcaService } from '../../Microservicio.Inventory.Business/Interfaces/IMarcaService';
import { IModeloService } from '../../Microservicio.Inventory.Business/Interfaces/IModeloService';
import { IVehiculoService } from '../../Microservicio.Inventory.Business/Interfaces/IVehiculoService';
import { BusinessException } from '../../Microservicio.Inventory.Business/Exceptions/BusinessException';
import { authorize, requireAuth } from '../Extensions/AuthenticationExtensions';
import { ok } from '../Models/ApiResponse';

export function createVehiculoRouter(
  service: IVehiculoService,
  marcaService: IMarcaService,
  categoriaService: ICategoriaService,
  modeloService: IModeloService,
): Router {
  const router = Router();

  /**
   * @openapi
   * /api/v1/vehiculos:
   *   get:
   *     summary: Listar vehículos con filtros opcionales
   *     tags: [Vehiculos]
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
   *       - in: query
   *         name: categoriaId
   *         schema: { type: string, format: uuid }
   *       - in: query
   *         name: estadoId
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Lista paginada de vehículos
   */
  router.get('/', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
      const marcaId = req.query.marcaId as string | undefined;
      const categoriaId = req.query.categoriaId as string | undefined;
      const estadoId = req.query.estadoId as string | undefined;
      res.json(ok(await service.getAll(page, pageSize, marcaId, categoriaId, estadoId)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/categorias:
   *   get:
   *     summary: Listar categorías de vehículos (lookup para filtros)
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       200:
   *         description: Lista de categorías disponibles
   */
  // Rutas estáticas ANTES de /:id para que Express no las interprete como parámetros
  router.get('/categorias', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 100;
      res.json(ok(await categoriaService.getAll(page, pageSize)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/marcas:
   *   get:
   *     summary: Listar marcas disponibles (lookup para filtros)
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     responses:
   *       200:
   *         description: Lista de marcas disponibles
   */
  router.get('/marcas', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 100;
      res.json(ok(await marcaService.getAll(page, pageSize)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/modelos:
   *   get:
   *     summary: Listar modelos disponibles (lookup para filtros)
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: query
   *         name: marcaId
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Lista de modelos disponibles
   */
  router.get('/modelos', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 100;
      const marcaId = req.query.marcaId as string | undefined;
      res.json(ok(await modeloService.getAll(page, pageSize, marcaId)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/{id}:
   *   get:
   *     summary: Obtener vehículo por ID
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Vehículo encontrado
   *       404:
   *         description: No encontrado
   */
  router.get('/:id', requireAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(ok(await service.getById(req.params.id)));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos:
   *   post:
   *     summary: Crear vehículo (solo ADMIN)
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [placa, anio, precioDia]
   *             properties:
   *               placa: { type: string, example: "ABC-1234" }
   *               anio: { type: integer, example: 2023 }
   *               precioDia: { type: number, example: 85.50 }
   *               color: { type: string }
   *               kilometraje: { type: integer }
   *               modeloId: { type: string, format: uuid }
   *               categoriaId: { type: string, format: uuid }
   *               combustibleId: { type: string, format: uuid }
   *               transmisionId: { type: string, format: uuid }
   *               estadoId: { type: string, format: uuid }
   *     responses:
   *       201:
   *         description: Vehículo creado
   *       400:
   *         description: Validación fallida (placa, precio, etc.)
   */
  router.post('/', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.status(201).json(ok(await service.create(req.body), 'Vehículo creado correctamente.'));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/{id}:
   *   put:
   *     summary: Actualizar vehículo (solo ADMIN)
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Vehículo actualizado
   */
  router.put('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(ok(await service.update(req.params.id, req.body), 'Vehículo actualizado correctamente.'));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/{id}:
   *   delete:
   *     summary: Eliminar vehículo (solo ADMIN)
   *     tags: [Vehiculos]
   *     security: [{ bearerAuth: [] }]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema: { type: string, format: uuid }
   *     responses:
   *       200:
   *         description: Vehículo eliminado
   */
  router.delete('/:id', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      await service.delete(req.params.id);
      res.json(ok(null, 'Vehículo eliminado correctamente.'));
    } catch (e) { next(e); }
  });

  /**
   * @openapi
   * /api/v1/vehiculos/{id}/kilometraje:
   *   patch:
   *     summary: Actualizar kilometraje — Regla de Negocio #6 (solo ADMIN)
   *     tags: [Vehiculos]
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
   *             required: [nuevo_km]
   *             properties:
   *               nuevo_km: { type: integer, example: 15000 }
   *     responses:
   *       200:
   *         description: Kilometraje actualizado
   *       400:
   *         description: El nuevo km no puede ser menor o igual al actual
   */
  router.patch('/:id/kilometraje', requireAuth, authorize(['ADMIN']), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nuevo_km } = req.body;
      if (nuevo_km === undefined || nuevo_km === null) {
        throw new BusinessException("El campo 'nuevo_km' es obligatorio.", 400);
      }
      await service.updateKilometraje(req.params.id, Number(nuevo_km));
      res.json(ok(null, 'Kilometraje actualizado correctamente.'));
    } catch (e) { next(e); }
  });

  return router;
}
