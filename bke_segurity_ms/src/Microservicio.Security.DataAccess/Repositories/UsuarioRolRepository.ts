import { PrismaClient } from '../../generated/prisma';
import { UsuarioRolEntity } from '../Entities/UsuarioRolEntity';
import { IUsuarioRolRepository } from './Interfaces/IUsuarioRolRepository';

export class UsuarioRolRepository implements IUsuarioRolRepository {
  constructor(private readonly prisma: PrismaClient) {}
  

  async findByUsuarioId(usuarioId: string): Promise<UsuarioRolEntity[]> {
    return this.prisma.usuario_roles.findMany({ where: { usu_id: usuarioId } });
  }

  async findByRolId(rolId: string): Promise<UsuarioRolEntity[]> {
    return this.prisma.usuario_roles.findMany({ where: { rol_id: rolId } });
  }

  async assign(usuarioId: string, rolId: string): Promise<UsuarioRolEntity> {
    return this.prisma.usuario_roles.create({
      data: { usu_id: usuarioId, rol_id: rolId },
    });
  }

  async remove(usuarioId: string, rolId: string): Promise<void> {
    await this.prisma.usuario_roles.delete({
      where: { usu_id_rol_id: { usu_id: usuarioId, rol_id: rolId } },
    });
  }

  async exists(usuarioId: string, rolId: string): Promise<boolean> {
    const count = await this.prisma.usuario_roles.count({
      where: { usu_id: usuarioId, rol_id: rolId },
    });
    return count > 0;
  }
}
