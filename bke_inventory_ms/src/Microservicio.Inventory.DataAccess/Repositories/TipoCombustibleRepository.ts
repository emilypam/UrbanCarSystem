import { PrismaClient } from '@prisma/client';
import { TipoCombustibleEntity } from '../Entities/TipoCombustibleEntity';
import { ITipoCombustibleRepository } from './Interfaces/ITipoCombustibleRepository';

export class TipoCombustibleRepository implements ITipoCombustibleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<TipoCombustibleEntity | null> {
    return this.prisma.tipos_combustible.findUnique({ where: { com_id: id } });
  }

  async findByNombre(nombre: string): Promise<TipoCombustibleEntity | null> {
    return this.prisma.tipos_combustible.findUnique({ where: { com_nombre: nombre } });
  }

  async findAll(): Promise<TipoCombustibleEntity[]> {
    return this.prisma.tipos_combustible.findMany({ orderBy: { com_nombre: 'asc' } });
  }

  async create(entity: Omit<TipoCombustibleEntity, 'com_id'>): Promise<TipoCombustibleEntity> {
    return this.prisma.tipos_combustible.create({ data: entity });
  }

  async update(id: string, entity: Partial<TipoCombustibleEntity>): Promise<TipoCombustibleEntity> {
    return this.prisma.tipos_combustible.update({ where: { com_id: id }, data: entity });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.tipos_combustible.delete({ where: { com_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.tipos_combustible.count({ where: { com_id: id } });
    return count > 0;
  }
}
