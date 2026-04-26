import { PrismaClient } from '@prisma/client';
import { CategoriaEntity } from '../Entities/CategoriaEntity';
import { ICategoriaRepository } from './Interfaces/ICategoriaRepository';

export class CategoriaRepository implements ICategoriaRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<CategoriaEntity | null> {
    return this.prisma.categorias.findUnique({ where: { cat_id: id } });
  }

  async findByNombre(nombre: string): Promise<CategoriaEntity | null> {
    return this.prisma.categorias.findUnique({ where: { cat_nombre: nombre } });
  }

  async findAll(): Promise<CategoriaEntity[]> {
    return this.prisma.categorias.findMany({ orderBy: { cat_nombre: 'asc' } });
  }

  async create(entity: Omit<CategoriaEntity, 'cat_id'>): Promise<CategoriaEntity> {
    return this.prisma.categorias.create({ data: entity });
  }

  async update(id: string, entity: Partial<CategoriaEntity>): Promise<CategoriaEntity> {
    return this.prisma.categorias.update({ where: { cat_id: id }, data: entity });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.categorias.delete({ where: { cat_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.categorias.count({ where: { cat_id: id } });
    return count > 0;
  }
}
