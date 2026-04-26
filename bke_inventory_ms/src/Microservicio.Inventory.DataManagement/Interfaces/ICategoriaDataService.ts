import { DataPagedResult } from '../Models/DataPagedResult';
import { CategoriaDataModel } from '../Models/CategoriaDataModel';
import { CategoriaFiltroDataModel } from '../Models/CategoriaFiltroDataModel';

export interface ICategoriaDataService {
  getAll(filtro: CategoriaFiltroDataModel): Promise<DataPagedResult<CategoriaDataModel>>;
  getById(id: string): Promise<CategoriaDataModel | null>;
  create(model: CategoriaDataModel): Promise<CategoriaDataModel>;
  update(model: CategoriaDataModel): Promise<CategoriaDataModel>;
  delete(id: string): Promise<void>;
}
