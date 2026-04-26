import { IUnitOfWork } from '../Interfaces/IUnitOfWork';
import { IMarcaDataService } from '../Interfaces/IMarcaDataService';
import { ICategoriaDataService } from '../Interfaces/ICategoriaDataService';
import { ITipoCombustibleDataService } from '../Interfaces/ITipoCombustibleDataService';
import { ITipoTransmisionDataService } from '../Interfaces/ITipoTransmisionDataService';
import { IEstadoVehiculoDataService } from '../Interfaces/IEstadoVehiculoDataService';
import { IModeloDataService } from '../Interfaces/IModeloDataService';
import { IVehiculoDataService } from '../Interfaces/IVehiculoDataService';
import { IMantenimientoDataService } from '../Interfaces/IMantenimientoDataService';

export class UnitOfWork implements IUnitOfWork {
  constructor(
    public readonly marcas: IMarcaDataService,
    public readonly categorias: ICategoriaDataService,
    public readonly tiposCombustible: ITipoCombustibleDataService,
    public readonly tiposTransmision: ITipoTransmisionDataService,
    public readonly estadosVehiculo: IEstadoVehiculoDataService,
    public readonly modelos: IModeloDataService,
    public readonly vehiculos: IVehiculoDataService,
    public readonly mantenimientos: IMantenimientoDataService,
  ) {}
}
