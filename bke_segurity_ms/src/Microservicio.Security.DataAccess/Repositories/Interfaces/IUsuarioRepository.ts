import { UsuarioEntity } from '../../Entities/UsuarioEntity';

export interface IUsuarioRepository {
  findById(id: string): Promise<UsuarioEntity | null>;
  findByEmail(email: string): Promise<UsuarioEntity | null>;
  create(entity: UsuarioEntity): Promise<UsuarioEntity>;
  update(id: string, entity: Partial<UsuarioEntity>): Promise<UsuarioEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
