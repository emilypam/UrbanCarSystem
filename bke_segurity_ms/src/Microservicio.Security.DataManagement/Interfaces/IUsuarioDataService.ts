import { UsuarioDataModel } from '../Models/UsuarioDataModel';
import { UsuarioFiltroDataModel } from '../Models/UsuarioFiltroDataModel';
import { DataPagedResult } from '../Models/DataPagedResult';

export interface IUsuarioDataService {
  getById(id: string): Promise<UsuarioDataModel | null>;
  getByEmail(email: string): Promise<UsuarioDataModel | null>;
  getAll(filtro: UsuarioFiltroDataModel): Promise<DataPagedResult<UsuarioDataModel>>;
  create(model: UsuarioDataModel): Promise<UsuarioDataModel>;
  update(id: string, model: Partial<UsuarioDataModel>): Promise<UsuarioDataModel>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
