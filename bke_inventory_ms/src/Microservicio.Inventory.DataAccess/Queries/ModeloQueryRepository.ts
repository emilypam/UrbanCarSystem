import { PrismaClient } from '@prisma/client';
import { ModeloEntity } from '../Entities/ModeloEntity';
import { PagedResult } from '../Common/PagedResult';
import { IModeloQueryRepository } from '../Repositories/Interfaces/IModeloQueryRepository';

export class ModeloQueryRepository implements IModeloQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(page: number, pageSize: number, marcaId?: string): Promise<PagedResult<ModeloEntity>> {
    const skip = (page - 1) * pageSize;
    const where = marcaId ? { mar_id: marcaId } : {};
    const [items, total] = await Promise.all([
      this.prisma.modelos.findMany({ where, skip, take: pageSize, orderBy: { mod_nombre: 'asc' } }),
      this.prisma.modelos.count({ where }),
    ]);
    return new PagedResult(items, total, page, pageSize);
  }

  async findByMarcaId(marcaId: string): Promise<ModeloEntity[]> {
    return this.prisma.modelos.findMany({
      where: { mar_id: marcaId },
      orderBy: { mod_nombre: 'asc' },
    });
  }

  async searchByNombre(nombre: string): Promise<ModeloEntity[]> {
    return this.prisma.modelos.findMany({
      where: { mod_nombre: { contains: nombre, mode: 'insensitive' } },
    });
  }
}
