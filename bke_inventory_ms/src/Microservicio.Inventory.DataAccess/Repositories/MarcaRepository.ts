import { PrismaClient } from '@prisma/client';
import { MarcaEntity } from '../Entities/MarcaEntity';
import { IMarcaRepository } from './Interfaces/IMarcaRepository';

export class MarcaRepository implements IMarcaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<MarcaEntity | null> {
    return this.prisma.marcas.findUnique({ where: { mar_id: id } });
  }

  async findByNombre(nombre: string): Promise<MarcaEntity | null> {
    return this.prisma.marcas.findUnique({ where: { mar_nombre: nombre } });
  }

  async findAll(): Promise<MarcaEntity[]> {
    return this.prisma.marcas.findMany({ orderBy: { mar_nombre: 'asc' } });
  }

  async create(entity: Omit<MarcaEntity, 'mar_id'>): Promise<MarcaEntity> {
    return this.prisma.marcas.create({ data: entity });
  }

  async update(id: string, entity: Partial<MarcaEntity>): Promise<MarcaEntity> {
    return this.prisma.marcas.update({ where: { mar_id: id }, data: entity });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.marcas.delete({ where: { mar_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.marcas.count({ where: { mar_id: id } });
    return count > 0;
  }
}
