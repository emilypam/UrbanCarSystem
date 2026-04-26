import { Express } from 'express';
import { InventoryDbContext } from '../../Microservicio.Inventory.DataAccess/Context/InventoryDbContext';
import { CategoriaQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/CategoriaQueryRepository';
import { EstadoVehiculoQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/EstadoVehiculoQueryRepository';
import { MantenimientoQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/MantenimientoQueryRepository';
import { MarcaQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/MarcaQueryRepository';
import { ModeloQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/ModeloQueryRepository';
import { TipoCombustibleQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/TipoCombustibleQueryRepository';
import { TipoTransmisionQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/TipoTransmisionQueryRepository';
import { VehiculoQueryRepository } from '../../Microservicio.Inventory.DataAccess/Queries/VehiculoQueryRepository';
import { CategoriaRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/CategoriaRepository';
import { EstadoVehiculoRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/EstadoVehiculoRepository';
import { MantenimientoRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/MantenimientoRepository';
import { MarcaRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/MarcaRepository';
import { ModeloRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/ModeloRepository';
import { TipoCombustibleRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/TipoCombustibleRepository';
import { TipoTransmisionRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/TipoTransmisionRepository';
import { VehiculoRepository } from '../../Microservicio.Inventory.DataAccess/Repositories/VehiculoRepository';
import { CategoriaDataService } from '../../Microservicio.Inventory.DataManagement/Services/CategoriaDataService';
import { EstadoVehiculoDataService } from '../../Microservicio.Inventory.DataManagement/Services/EstadoVehiculoDataService';
import { MantenimientoDataService } from '../../Microservicio.Inventory.DataManagement/Services/MantenimientoDataService';
import { MarcaDataService } from '../../Microservicio.Inventory.DataManagement/Services/MarcaDataService';
import { ModeloDataService } from '../../Microservicio.Inventory.DataManagement/Services/ModeloDataService';
import { TipoCombustibleDataService } from '../../Microservicio.Inventory.DataManagement/Services/TipoCombustibleDataService';
import { TipoTransmisionDataService } from '../../Microservicio.Inventory.DataManagement/Services/TipoTransmisionDataService';
import { UnitOfWork } from '../../Microservicio.Inventory.DataManagement/Services/UnitOfWork';
import { VehiculoDataService } from '../../Microservicio.Inventory.DataManagement/Services/VehiculoDataService';
import { CategoriaService } from '../../Microservicio.Inventory.Business/Services/CategoriaService';
import { EstadoVehiculoService } from '../../Microservicio.Inventory.Business/Services/EstadoVehiculoService';
import { MantenimientoService } from '../../Microservicio.Inventory.Business/Services/MantenimientoService';
import { MarcaService } from '../../Microservicio.Inventory.Business/Services/MarcaService';
import { ModeloService } from '../../Microservicio.Inventory.Business/Services/ModeloService';
import { TipoCombustibleService } from '../../Microservicio.Inventory.Business/Services/TipoCombustibleService';
import { TipoTransmisionService } from '../../Microservicio.Inventory.Business/Services/TipoTransmisionService';
import { VehiculoService } from '../../Microservicio.Inventory.Business/Services/VehiculoService';
import { createCategoriaRouter } from '../Controllers/CategoriaController';
import { createEstadoVehiculoRouter } from '../Controllers/EstadoVehiculoController';
import { createMantenimientoRouter } from '../Controllers/MantenimientoController';
import { createMarcaRouter } from '../Controllers/MarcaController';
import { createModeloRouter } from '../Controllers/ModeloController';
import { createTipoCombustibleRouter } from '../Controllers/TipoCombustibleController';
import { createTipoTransmisionRouter } from '../Controllers/TipoTransmisionController';
import { createVehiculoRouter } from '../Controllers/VehiculoController';
import { API_PREFIX } from './ApiVersioningExtensions';

export function buildServiceContainer(app: Express): void {
  // DataAccess
  const dbContext = InventoryDbContext.getInstance();
  const prisma = dbContext.client;

  const marcaRepo = new MarcaRepository(prisma);
  const marcaQuery = new MarcaQueryRepository(prisma);
  const categoriaRepo = new CategoriaRepository(prisma);
  const categoriaQuery = new CategoriaQueryRepository(prisma);
  const tipoCombRepo = new TipoCombustibleRepository(prisma);
  const tipoCombQuery = new TipoCombustibleQueryRepository(prisma);
  const tipoTransRepo = new TipoTransmisionRepository(prisma);
  const tipoTransQuery = new TipoTransmisionQueryRepository(prisma);
  const estadoRepo = new EstadoVehiculoRepository(prisma);
  const estadoQuery = new EstadoVehiculoQueryRepository(prisma);
  const modeloRepo = new ModeloRepository(prisma);
  const modeloQuery = new ModeloQueryRepository(prisma);
  const vehiculoRepo = new VehiculoRepository(prisma);
  const vehiculoQuery = new VehiculoQueryRepository(prisma);
  const mantenimientoRepo = new MantenimientoRepository(prisma);
  const mantenimientoQuery = new MantenimientoQueryRepository(prisma);

  // DataManagement
  const uow = new UnitOfWork(
    new MarcaDataService(marcaRepo, marcaQuery),
    new CategoriaDataService(categoriaRepo, categoriaQuery),
    new TipoCombustibleDataService(tipoCombRepo, tipoCombQuery),
    new TipoTransmisionDataService(tipoTransRepo, tipoTransQuery),
    new EstadoVehiculoDataService(estadoRepo, estadoQuery),
    new ModeloDataService(modeloRepo, modeloQuery),
    new VehiculoDataService(vehiculoRepo, vehiculoQuery),
    new MantenimientoDataService(mantenimientoRepo, mantenimientoQuery),
  );

  // Business
  const marcaService = new MarcaService(uow);
  const categoriaService = new CategoriaService(uow);
  const tipoCombService = new TipoCombustibleService(uow);
  const tipoTransService = new TipoTransmisionService(uow);
  const estadoService = new EstadoVehiculoService(uow);
  const modeloService = new ModeloService(uow);
  const vehiculoService = new VehiculoService(uow);
  const mantenimientoService = new MantenimientoService(uow);

  // Routes
  app.use(`${API_PREFIX}/marcas`, createMarcaRouter(marcaService));
  app.use(`${API_PREFIX}/categorias`, createCategoriaRouter(categoriaService));
  app.use(`${API_PREFIX}/tipos-combustible`, createTipoCombustibleRouter(tipoCombService));
  app.use(`${API_PREFIX}/tipos-transmision`, createTipoTransmisionRouter(tipoTransService));
  app.use(`${API_PREFIX}/estados-vehiculo`, createEstadoVehiculoRouter(estadoService));
  app.use(`${API_PREFIX}/modelos`, createModeloRouter(modeloService));
  app.use(`${API_PREFIX}/vehiculos`, createVehiculoRouter(vehiculoService, marcaService, categoriaService, modeloService));
  app.use(`${API_PREFIX}/mantenimientos`, createMantenimientoRouter(mantenimientoService));
}
