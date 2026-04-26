import { DataPagedResult } from '../Models/DataPagedResult';
import { MantenimientoDataModel } from '../Models/MantenimientoDataModel';
import { MantenimientoFiltroDataModel } from '../Models/MantenimientoFiltroDataModel';

export interface IMantenimientoDataService {
  getAll(filtro: MantenimientoFiltroDataModel): Promise<DataPagedResult<MantenimientoDataModel>>;
  getById(id: string): Promise<MantenimientoDataModel | null>;
  create(model: MantenimientoDataModel): Promise<MantenimientoDataModel>;
  update(model: MantenimientoDataModel): Promise<MantenimientoDataModel>;
  delete(id: string): Promise<void>;
}
