import { ICategoriaQueryRepository } from '../Repositories/Interfaces/ICategoriaQueryRepository';
import { PrismaClient } from '@prisma/client';
import { CategoriaEntity } from '../Entities/CategoriaEntity';
import { PagedResult } from '../Common/PagedResult';

export class CategoriaQueryRepository implements ICategoriaQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<CategoriaEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.categorias.findMany({ skip, take: pageSize, orderBy: { cat_nombre: 'asc' } }),
      this.prisma.categorias.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async searchByNombre(nombre: string): Promise<CategoriaEntity[]> {
    return this.prisma.categorias.findMany({
      where: { cat_nombre: { contains: nombre, mode: 'insensitive' } },
      orderBy: { cat_nombre: 'asc' },
    });
  }
}
