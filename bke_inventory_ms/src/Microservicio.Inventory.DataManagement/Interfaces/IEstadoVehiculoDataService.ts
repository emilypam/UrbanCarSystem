import { DataPagedResult } from '../Models/DataPagedResult';
import { EstadoVehiculoDataModel } from '../Models/EstadoVehiculoDataModel';
import { EstadoVehiculoFiltroDataModel } from '../Models/EstadoVehiculoFiltroDataModel';

export interface IEstadoVehiculoDataService {
  getAll(filtro: EstadoVehiculoFiltroDataModel): Promise<DataPagedResult<EstadoVehiculoDataModel>>;
  getById(id: string): Promise<EstadoVehiculoDataModel | null>;
  create(model: EstadoVehiculoDataModel): Promise<EstadoVehiculoDataModel>;
  update(model: EstadoVehiculoDataModel): Promise<EstadoVehiculoDataModel>;
  delete(id: string): Promise<void>;
}
