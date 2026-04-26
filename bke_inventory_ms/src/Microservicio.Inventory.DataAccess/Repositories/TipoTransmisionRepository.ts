import { PrismaClient } from '@prisma/client';
import { TipoTransmisionEntity } from '../Entities/TipoTransmisionEntity';
import { ITipoTransmisionRepository } from './Interfaces/ITipoTransmisionRepository';

export class TipoTransmisionRepository implements ITipoTransmisionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<TipoTransmisionEntity | null> {
    return this.prisma.tipos_transmision.findUnique({ where: { tra_id: id } });
  }

  async findByNombre(nombre: string): Promise<TipoTransmisionEntity | null> {
    return this.prisma.tipos_transmision.findUnique({ where: { tra_nombre: nombre } });
  }

  async findAll(): Promise<TipoTransmisionEntity[]> {
    return this.prisma.tipos_transmision.findMany({ orderBy: { tra_nombre: 'asc' } });
  }

  async create(entity: Omit<TipoTransmisionEntity, 'tra_id'>): Promise<TipoTransmisionEntity> {
    return this.prisma.tipos_transmision.create({ data: entity });
  }

  async update(id: string, entity: Partial<TipoTransmisionEntity>): Promise<TipoTransmisionEntity> {
    return this.prisma.tipos_transmision.update({ where: { tra_id: id }, data: entity });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tipos_transmision.delete({ where: { tra_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.tipos_transmision.count({ where: { tra_id: id } });
    return count > 0;
  }
}
