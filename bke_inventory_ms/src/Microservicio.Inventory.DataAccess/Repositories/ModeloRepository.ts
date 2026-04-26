import { PrismaClient } from '@prisma/client';
import { ModeloEntity } from '../Entities/ModeloEntity';
import { IModeloRepository } from './Interfaces/IModeloRepository';

export class ModeloRepository implements IModeloRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<ModeloEntity | null> {
    return this.prisma.modelos.findUnique({ where: { mod_id: id } });
  }

  async findByMarcaId(marcaId: string): Promise<ModeloEntity[]> {
    return this.prisma.modelos.findMany({ where: { mar_id: marcaId }, orderBy: { mod_nombre: 'asc' } });
  }

  async create(entity: Omit<ModeloEntity, 'mod_id'>): Promise<ModeloEntity> {
    return this.prisma.modelos.create({ data: entity });
  }

  async update(id: string, entity: Partial<ModeloEntity>): Promise<ModeloEntity> {
    return this.prisma.modelos.update({ where: { mod_id: id }, data: entity });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.modelos.delete({ where: { mod_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.modelos.count({ where: { mod_id: id } });
    return count > 0;
  }
}
