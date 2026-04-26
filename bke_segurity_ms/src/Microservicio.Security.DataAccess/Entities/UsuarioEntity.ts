export interface UsuarioEntity {
  usu_id: string;
  usu_email: string;
  usu_nombre: string | null;
  usu_created_at: Date | null;
  usu_password: string | null;
}
