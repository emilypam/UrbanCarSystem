import { UsuarioRolDataModel } from '../Models/UsuarioRolDataModel';

export interface IUsuarioRolDataService {
  getByUsuarioId(usuarioId: string): Promise<UsuarioRolDataModel[]>;
  getByRolId(rolId: string): Promise<UsuarioRolDataModel[]>;
  assign(usuarioId: string, rolId: string): Promise<UsuarioRolDataModel>;
  remove(usuarioId: string, rolId: string): Promise<void>;
  exists(usuarioId: string, rolId: string): Promise<boolean>;
}
