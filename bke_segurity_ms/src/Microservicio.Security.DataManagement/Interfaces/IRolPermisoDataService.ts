import { RolPermisoDataModel } from '../Models/RolPermisoDataModel';
import { RolPermisoFiltroDataModel } from '../Models/RolPermisoFiltroDataModel';
import { DataPagedResult } from '../Models/DataPagedResult';

export interface IRolPermisoDataService {
  getById(id: string): Promise<RolPermisoDataModel | null>;
  getAll(filtro: RolPermisoFiltroDataModel): Promise<DataPagedResult<RolPermisoDataModel>>;
  create(model: Omit<RolPermisoDataModel, 'rolId'>): Promise<RolPermisoDataModel>;
  update(id: string, model: Partial<RolPermisoDataModel>): Promise<RolPermisoDataModel>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
