import { RolPermisoEntity } from '../../Entities/RolPermisoEntity';

export interface IRolPermisoRepository {
  findById(id: string): Promise<RolPermisoEntity | null>;
  findByNombre(nombre: string): Promise<RolPermisoEntity | null>;
  findAll(): Promise<RolPermisoEntity[]>;
  create(entity: Omit<RolPermisoEntity, 'rol_id'>): Promise<RolPermisoEntity>;
  update(id: string, entity: Partial<RolPermisoEntity>): Promise<RolPermisoEntity>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}
