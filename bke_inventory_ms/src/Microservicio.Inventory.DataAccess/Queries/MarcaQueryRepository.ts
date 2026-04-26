import { IMarcaQueryRepository } from '../Repositories/Interfaces/IMarcaQueryRepository';
import { PrismaClient } from '@prisma/client';
import { MarcaEntity } from '../Entities/MarcaEntity';
import { PagedResult } from '../Common/PagedResult';

export class MarcaQueryRepository implements IMarcaQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<MarcaEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.marcas.findMany({ skip, take: pageSize, orderBy: { mar_nombre: 'asc' } }),
      this.prisma.marcas.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async searchByNombre(nombre: string): Promise<MarcaEntity[]> {
    return this.prisma.marcas.findMany({
      where: { mar_nombre: { contains: nombre, mode: 'insensitive' } },
      orderBy: { mar_nombre: 'asc' },
    });
  }
}
