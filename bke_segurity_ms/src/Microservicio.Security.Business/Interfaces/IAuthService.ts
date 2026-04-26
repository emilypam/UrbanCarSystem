import { LoginRequest } from '../DTOs/Auth/LoginRequest';
import { LoginResponse } from '../DTOs/Auth/LoginResponse';

export interface IAuthService {
  login(request: LoginRequest): Promise<LoginResponse>;
  validateToken(token: string): Promise<{ usuarioId: string; email: string; roles: string[] }>;
  refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }>;
}
