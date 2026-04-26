import { UsuarioRolEntity } from '../../Entities/UsuarioRolEntity';

export interface IUsuarioRolRepository {
  findByUsuarioId(usuarioId: string): Promise<UsuarioRolEntity[]>;
  findByRolId(rolId: string): Promise<UsuarioRolEntity[]>;
  assign(usuarioId: string, rolId: string): Promise<UsuarioRolEntity>;
  remove(usuarioId: string, rolId: string): Promise<void>;
  exists(usuarioId: string, rolId: string): Promise<boolean>;
}
