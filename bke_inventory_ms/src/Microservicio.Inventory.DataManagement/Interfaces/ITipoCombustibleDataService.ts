import { DataPagedResult } from '../Models/DataPagedResult';
import { TipoCombustibleDataModel } from '../Models/TipoCombustibleDataModel';
import { TipoCombustibleFiltroDataModel } from '../Models/TipoCombustibleFiltroDataModel';

export interface ITipoCombustibleDataService {
  getAll(filtro: TipoCombustibleFiltroDataModel): Promise<DataPagedResult<TipoCombustibleDataModel>>;
  getById(id: string): Promise<TipoCombustibleDataModel | null>;
  create(model: TipoCombustibleDataModel): Promise<TipoCombustibleDataModel>;
  update(model: TipoCombustibleDataModel): Promise<TipoCombustibleDataModel>;
  delete(id: string): Promise<void>;
}
