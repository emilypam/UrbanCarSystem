export interface UsuarioDataModel {
  usuarioId: string;
  email: string;
  nombre: string | null;
  createdAt: Date | null;
  password?: string | null;
}
