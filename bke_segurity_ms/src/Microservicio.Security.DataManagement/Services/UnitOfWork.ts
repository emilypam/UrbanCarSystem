import { PrismaClient } from '../../generated/prisma';
import { IUnitOfWork } from '../Interfaces/IUnitOfWork';
import { IUsuarioRepository } from '../../Microservicio.Security.DataAccess/Repositories/Interfaces/IUsuarioRepository';
import { IRolPermisoRepository } from '../../Microservicio.Security.DataAccess/Repositories/Interfaces/IRolPermisoRepository';
import { IUsuarioRolRepository } from '../../Microservicio.Security.DataAccess/Repositories/Interfaces/IUsuarioRolRepository';
import { UsuarioRepository } from '../../Microservicio.Security.DataAccess/Repositories/UsuarioRepository';
import { RolPermisoRepository } from '../../Microservicio.Security.DataAccess/Repositories/RolPermisoRepository';
import { UsuarioRolRepository } from '../../Microservicio.Security.DataAccess/Repositories/UsuarioRolRepository';

export class UnitOfWork implements IUnitOfWork {
  public readonly usuarios: IUsuarioRepository;
  public readonly rolesPermisos: IRolPermisoRepository;
  public readonly usuarioRoles: IUsuarioRolRepository;

  constructor(private readonly prisma: PrismaClient) {
    this.usuarios = new UsuarioRepository(prisma);
    this.rolesPermisos = new RolPermisoRepository(prisma);
    this.usuarioRoles = new UsuarioRolRepository(prisma);
  }

  async executeInTransaction<T>(work: () => Promise<T>): Promise<T> {
    return this.prisma.$transaction(async () => work());
  }
}
