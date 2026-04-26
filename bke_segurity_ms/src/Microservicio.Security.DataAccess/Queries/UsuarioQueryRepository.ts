import { PrismaClient } from '../../generated/prisma';
import { UsuarioEntity } from '../Entities/UsuarioEntity';
import { PagedResult } from '../Common/PagedResult';

export class UsuarioQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<UsuarioEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.usuarios.findMany({
        skip,
        take: pageSize,
        orderBy: { usu_created_at: 'desc' },
      }),
      this.prisma.usuarios.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async findWithRoles(id: string) {
    return this.prisma.usuarios.findUnique({
      where: { usu_id: id },
      include: {
        usuario_roles: {
          include: { roles_permisos: true },
        },
      },
    });
  }

  async searchByEmail(email: string): Promise<UsuarioEntity[]> {
    return this.prisma.usuarios.findMany({
      where: { usu_email: { contains: email, mode: 'insensitive' } },
    });
  }
}
