import { ICategoriaDataService } from './ICategoriaDataService';
import { IEstadoVehiculoDataService } from './IEstadoVehiculoDataService';
import { IMantenimientoDataService } from './IMantenimientoDataService';
import { IMarcaDataService } from './IMarcaDataService';
import { IModeloDataService } from './IModeloDataService';
import { ITipoCombustibleDataService } from './ITipoCombustibleDataService';
import { ITipoTransmisionDataService } from './ITipoTransmisionDataService';
import { IVehiculoDataService } from './IVehiculoDataService';

export interface IUnitOfWork {
  marcas: IMarcaDataService;
  categorias: ICategoriaDataService;
  tiposCombustible: ITipoCombustibleDataService;
  tiposTransmision: ITipoTransmisionDataService;
  estadosVehiculo: IEstadoVehiculoDataService;
  modelos: IModeloDataService;
  vehiculos: IVehiculoDataService;
  mantenimientos: IMantenimientoDataService;
}
