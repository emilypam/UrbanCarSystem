import { AsignarRolRequest } from '../DTOs/UsuarioRol/AsignarRolRequest';
import { UsuarioRolResponse } from '../DTOs/UsuarioRol/UsuarioRolResponse';

export interface IUsuarioRolService {
  getByUsuarioId(usuarioId: string): Promise<UsuarioRolResponse[]>;
  asignarRol(request: AsignarRolRequest): Promise<UsuarioRolResponse>;
  removerRol(usuarioId: string, rolId: string): Promise<void>;
}
