export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  usuario: {
    usuarioId: string;
    email: string;
    nombre: string | null;
    roles: string[];
  };
}
