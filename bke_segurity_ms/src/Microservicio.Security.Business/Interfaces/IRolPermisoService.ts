import { CrearRolPermisoRequest } from '../DTOs/RolPermiso/CrearRolPermisoRequest';
import { ActualizarRolPermisoRequest } from '../DTOs/RolPermiso/ActualizarRolPermisoRequest';
import { RolPermisoResponse } from '../DTOs/RolPermiso/RolPermisoResponse';
import { DataPagedResult } from '../../Microservicio.Security.DataManagement/Models/DataPagedResult';

export interface IRolPermisoService {
  getById(id: string): Promise<RolPermisoResponse>;
  getAll(page: number, pageSize: number): Promise<DataPagedResult<RolPermisoResponse>>;
  create(request: CrearRolPermisoRequest): Promise<RolPermisoResponse>;
  update(id: string, request: ActualizarRolPermisoRequest): Promise<RolPermisoResponse>;
  delete(id: string): Promise<void>;
}
