import { PrismaClient } from '../../generated/prisma';

export class UsuarioRolQueryRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findUsuarioConRoles(usuarioId: string) {
    return this.prisma.usuarios.findUnique({
      where: { usu_id: usuarioId },
      include: {
        usuario_roles: {
          include: { roles_permisos: true },
        },
      },
    });
  }

  async findRolesNombresDeUsuario(usuarioId: string): Promise<string[]> {
    const registros = await this.prisma.usuario_roles.findMany({
      where: { usu_id: usuarioId },
      include: { roles_permisos: true },
    });
    return registros.map((r) => r.roles_permisos.rol_nombre);
  }
}
