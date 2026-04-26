import { DataPagedResult } from '../Models/DataPagedResult';
import { TipoTransmisionDataModel } from '../Models/TipoTransmisionDataModel';
import { TipoTransmisionFiltroDataModel } from '../Models/TipoTransmisionFiltroDataModel';

export interface ITipoTransmisionDataService {
  getAll(filtro: TipoTransmisionFiltroDataModel): Promise<DataPagedResult<TipoTransmisionDataModel>>;
  getById(id: string): Promise<TipoTransmisionDataModel | null>;
  create(model: TipoTransmisionDataModel): Promise<TipoTransmisionDataModel>;
  update(model: TipoTransmisionDataModel): Promise<TipoTransmisionDataModel>;
  delete(id: string): Promise<void>;
}
