import { DataPagedResult } from '../Models/DataPagedResult';
import { ModeloDataModel } from '../Models/ModeloDataModel';
import { ModeloFiltroDataModel } from '../Models/ModeloFiltroDataModel';

export interface IModeloDataService {
  getAll(filtro: ModeloFiltroDataModel): Promise<DataPagedResult<ModeloDataModel>>;
  getById(id: string): Promise<ModeloDataModel | null>;
  create(model: ModeloDataModel): Promise<ModeloDataModel>;
  update(model: ModeloDataModel): Promise<ModeloDataModel>;
  delete(id: string): Promise<void>;
}
