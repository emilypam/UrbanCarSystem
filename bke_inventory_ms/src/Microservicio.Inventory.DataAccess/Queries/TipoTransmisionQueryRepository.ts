import { ITipoTransmisionQueryRepository } from '../Repositories/Interfaces/ITipoTransmisionQueryRepository';
import { PrismaClient } from '@prisma/client';
import { TipoTransmisionEntity } from '../Entities/TipoTransmisionEntity';
import { PagedResult } from '../Common/PagedResult';

export class TipoTransmisionQueryRepository implements ITipoTransmisionQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<TipoTransmisionEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.tipos_transmision.findMany({ skip, take: pageSize, orderBy: { tra_nombre: 'asc' } }),
      this.prisma.tipos_transmision.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async searchByNombre(nombre: string): Promise<TipoTransmisionEntity[]> {
    return this.prisma.tipos_transmision.findMany({
      where: { tra_nombre: { contains: nombre, mode: 'insensitive' } },
    });
  }
}
