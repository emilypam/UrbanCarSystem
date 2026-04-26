import { PrismaClient } from '../../generated/prisma';
import { UsuarioEntity } from '../Entities/UsuarioEntity';
import { IUsuarioRepository } from './Interfaces/IUsuarioRepository';

export class UsuarioRepository implements IUsuarioRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<UsuarioEntity | null> {
    return this.prisma.usuarios.findUnique({ where: { usu_id: id } });
  }

  async findByEmail(email: string): Promise<UsuarioEntity | null> {
    return this.prisma.usuarios.findUnique({ where: { usu_email: email } });
  }

  async create(entity: UsuarioEntity): Promise<UsuarioEntity> {
    return this.prisma.usuarios.create({ data: entity });
  }

  async update(id: string, entity: Partial<UsuarioEntity>): Promise<UsuarioEntity> {
    return this.prisma.usuarios.update({
      where: { usu_id: id },
      data: entity,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.usuarios.delete({ where: { usu_id: id } });
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.prisma.usuarios.count({ where: { usu_id: id } });
    return count > 0;
  }
}
