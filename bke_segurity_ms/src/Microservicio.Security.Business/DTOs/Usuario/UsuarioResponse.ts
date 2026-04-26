export interface RolEnUsuarioResponse {
  rolId: string;
  nombre: string;
  descripcion: string | null;
}

export interface UsuarioResponse {
  usuarioId: string;
  email: string;
  nombre: string | null;
  createdAt: Date | null;
  roles?: RolEnUsuarioResponse[];
}
