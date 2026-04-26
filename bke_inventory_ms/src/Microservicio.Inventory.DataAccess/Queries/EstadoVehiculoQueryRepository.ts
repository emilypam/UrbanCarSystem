import { IEstadoVehiculoQueryRepository } from '../Repositories/Interfaces/IEstadoVehiculoQueryRepository';
import { PrismaClient } from '@prisma/client';
import { EstadoVehiculoEntity } from '../Entities/EstadoVehiculoEntity';
import { PagedResult } from '../Common/PagedResult';

export class EstadoVehiculoQueryRepository implements IEstadoVehiculoQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number): Promise<PagedResult<EstadoVehiculoEntity>> {
    const skip = (page - 1) * pageSize;
    const [items, total] = await Promise.all([
      this.prisma.estados_vehiculo.findMany({ skip, take: pageSize, orderBy: { est_nombre: 'asc' } }),
      this.prisma.estados_vehiculo.count(),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async searchByNombre(nombre: string): Promise<EstadoVehiculoEntity[]> {
    return this.prisma.estados_vehiculo.findMany({
      where: { est_nombre: { contains: nombre, mode: 'insensitive' } },
    });
  }
}
