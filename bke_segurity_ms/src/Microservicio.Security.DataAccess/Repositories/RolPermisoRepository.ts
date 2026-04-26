import { PrismaClient } from '../../generated/prisma';
import { RolPermisoEntity } from '../Entities/RolPermisoEntity';
import { IRolPermisoRepository } from './Interfaces/IRolPermisoRepository';

export class RolPermisoRepository implements IRolPermisoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<RolPermisoEntity | null> {
    return this.prisma.roles_permisos.findUnique({ where: { rol_id: id } });
  }

  async findByNombre(nombre: string): Promise<RolPermisoEntity | null> {
    return this.prisma.roles_permisos.findUnique({ where: { rol_nombre: nombre } });
  }

  async findAll(): Promise<RolPermisoEntity[]> {
    return this.prisma.roles_permisos.findMany({ orderBy: { rol_nombre: 'asc' } });
  }

  async create(entity: Omit<RolPermisoEntity, 'rol_id'>): Promise<RolPermisoEntity> {
    return this.prisma.roles_permisos.create({ data: entity });
  }

  async update(id: string, entity: Partial<RolPermisoEntity>): Promise<RolPermisoEntity> {
    return this.prisma.roles_permisos.update({
      where: { rol_id: id },
      data: entity,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.roles_permisos.delete({ where: { rol_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.roles_permisos.count({ where: { rol_id: id } });
    return count > 0;
  }
}
