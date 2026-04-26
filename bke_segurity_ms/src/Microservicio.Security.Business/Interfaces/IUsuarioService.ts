import { CrearUsuarioRequest } from '../DTOs/Usuario/CrearUsuarioRequest';
import { ActualizarUsuarioRequest } from '../DTOs/Usuario/ActualizarUsuarioRequest';
import { UsuarioResponse } from '../DTOs/Usuario/UsuarioResponse';
import { DataPagedResult } from '../../Microservicio.Security.DataManagement/Models/DataPagedResult';

export interface IUsuarioService {
  getById(id: string): Promise<UsuarioResponse>;
  getAll(page: number, pageSize: number): Promise<DataPagedResult<UsuarioResponse>>;
  create(request: CrearUsuarioRequest): Promise<UsuarioResponse>;
  update(id: string, request: ActualizarUsuarioRequest): Promise<UsuarioResponse>;
  delete(id: string): Promise<void>;
}
