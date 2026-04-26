import { ITipoCombustibleQueryRepository } from '../Repositories/Interfaces/ITipoCombustibleQueryRepository';
import { PrismaClient } from '@prisma/client';
import { TipoCombustibleEntity } from '../Entities/TipoCombustibleEntity';
import { PagedResult } from '../Common/PagedResult';

export class TipoCombustibleQueryRepository implements ITipoCombustibleQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<TipoCombustibleEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.tipos_combustible.findMany({ skip, take: pageSize, orderBy: { com_nombre: 'asc' } }),
      this.prisma.tipos_combustible.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async searchByNombre(nombre: string): Promise<TipoCombustibleEntity[]> {
    return this.prisma.tipos_combustible.findMany({
      where: { com_nombre: { contains: nombre, mode: 'insensitive' } },
    });
  }
}
