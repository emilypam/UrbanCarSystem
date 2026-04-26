import { IUsuarioRepository } from '../../Microservicio.Security.DataAccess/Repositories/Interfaces/IUsuarioRepository';
import { IRolPermisoRepository } from '../../Microservicio.Security.DataAccess/Repositories/Interfaces/IRolPermisoRepository';
import { IUsuarioRolRepository } from '../../Microservicio.Security.DataAccess/Repositories/Interfaces/IUsuarioRolRepository';

export interface IUnitOfWork {
  readonly usuarios: IUsuarioRepository;
  readonly rolesPermisos: IRolPermisoRepository;
  readonly usuarioRoles: IUsuarioRolRepository;
  executeInTransaction<T>(work: () => Promise<T>): Promise<T>;
}
