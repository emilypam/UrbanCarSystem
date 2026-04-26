import { PrismaClient } from '../../generated/prisma';
import { RolPermisoEntity } from '../Entities/RolPermisoEntity';
import { PagedResult } from '../Common/PagedResult';

export class RolPermisoQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<RolPermisoEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.roles_permisos.findMany({
        skip,
        take: pageSize,
        orderBy: { rol_nombre: 'asc' },
      }),
      this.prisma.roles_permisos.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async findByNombreContaining(nombre: string): Promise<RolPermisoEntity[]> {
    return this.prisma.roles_permisos.findMany({
      where: { rol_nombre: { contains: nombre, mode: 'insensitive' } },
    });
  }
}
