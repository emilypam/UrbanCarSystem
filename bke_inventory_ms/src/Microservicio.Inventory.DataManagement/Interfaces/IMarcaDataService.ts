import { DataPagedResult } from '../Models/DataPagedResult';
import { MarcaDataModel } from '../Models/MarcaDataModel';
import { MarcaFiltroDataModel } from '../Models/MarcaFiltroDataModel';

export interface IMarcaDataService {
  getAll(filtro: MarcaFiltroDataModel): Promise<DataPagedResult<MarcaDataModel>>;
  getById(id: string): Promise<MarcaDataModel | null>;
  create(model: MarcaDataModel): Promise<MarcaDataModel>;
  update(model: MarcaDataModel): Promise<MarcaDataModel>;
  delete(id: string): Promise<void>;
}
