import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { IAuthService } from '../Interfaces/IAuthService';
import { IUsuarioDataService } from '../../Microservicio.Security.DataManagement/Interfaces/IUsuarioDataService';
import { LoginRequest } from '../DTOs/Auth/LoginRequest';
import { LoginResponse } from '../DTOs/Auth/LoginResponse';
import { BusinessException } from '../Exceptions/BusinessException';
import { UsuarioRolQueryRepository } from '../../Microservicio.Security.DataAccess/Queries/UsuarioRolQueryRepository';

interface JwtPayload {
  usuarioId: string;
  email: string;
  roles: string[];
  iat?: number;
  exp?: number;
}

export class AuthService implements IAuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly jwtRefreshExpiresIn: string;

  constructor(
    private readonly usuarioDataService: IUsuarioDataService,
    private readonly usuarioRolQueryRepo: UsuarioRolQueryRepository
  ) {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET no definido en variables de entorno.');
    this.jwtSecret = process.env.JWT_SECRET;
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
    this.jwtRefreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';
  }

  async login(request: LoginRequest): Promise<LoginResponse> {
    // 1. Limpieza total de entradas (Postman friendly)
    const emailLimpio = request.email ? request.email.trim() : '';
    const passwordLimpia = request.password ? request.password.trim() : '';

    if (!emailLimpio || !passwordLimpia) {
      throw new BusinessException('Email y password son requeridos.', 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailLimpio)) {
      throw new BusinessException('El email no tiene un formato válido.', 422);
    }

    // 2. Búsqueda de usuario en la BDD
    const usuario = await this.usuarioDataService.getByEmail(emailLimpio);
    
    console.log(`--- INTENTO DE LOGIN: ${emailLimpio} ---`);
    
    if (!usuario) {
      console.log('ERROR: Usuario no encontrado.');
      throw new BusinessException('Credenciales inválidas.', 401);
    }

    // 3. Verificación de contraseña (Bcrypt)
    if (usuario.password) {
      const passDB = usuario.password.trim();
      
      // Intentamos comparar directamente. Bcrypt detectará si es un hash válido.
      const passwordValido = await bcrypt.compare(passwordLimpia, passDB);
      
      console.log('¿La contraseña coincide?:', passwordValido);

      if (!passwordValido) {
        console.log('❌ ERROR: Contraseña incorrecta.');
        throw new BusinessException('Credenciales inválidas.', 401);
      }
    } else {
      // Caso de seguridad: usuario existe pero no tiene password seteado
      throw new BusinessException('El usuario no tiene una contraseña configurada.', 401);
    }

    // 4. Generación de Token y Respuesta Exitosa
    const roles = await this.usuarioRolQueryRepo.findRolesNombresDeUsuario(usuario.usuarioId);

    const payload: JwtPayload = {
      usuarioId: usuario.usuarioId,
      email: usuario.email,
      roles,
    };

    const accessToken = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    } as jwt.SignOptions);

    const refreshToken = jwt.sign(
      { usuarioId: usuario.usuarioId },
      this.jwtSecret,
      { expiresIn: this.jwtRefreshExpiresIn } as jwt.SignOptions
    );

    console.log('✅ LOGIN EXITOSO para:', usuario.email);

    return {
      accessToken,
      refreshToken,
      expiresIn: 86400,
      tokenType: 'Bearer',
      usuario: {
        usuarioId: usuario.usuarioId,
        email: usuario.email,
        nombre: usuario.nombre,
        roles,
      },
    };
  }

  async validateToken(token: string): Promise<{ usuarioId: string; email: string; roles: string[] }> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JwtPayload;
      return { usuarioId: decoded.usuarioId, email: decoded.email, roles: decoded.roles };
    } catch {
      throw new BusinessException('Token inválido o expirado.', 401);
    }
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; expiresIn: number }> {
    try {
      const decoded = jwt.verify(refreshToken, this.jwtSecret) as { usuarioId: string };
      const usuario = await this.usuarioDataService.getById(decoded.usuarioId);
      if (!usuario) throw new BusinessException('Usuario no encontrado.', 401);
      const roles = await this.usuarioRolQueryRepo.findRolesNombresDeUsuario(decoded.usuarioId);
      const payload: JwtPayload = { usuarioId: usuario.usuarioId, email: usuario.email, roles };
      const accessToken = jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn } as jwt.SignOptions);
      return { accessToken, expiresIn: 86400 };
    } catch (err) {
      if (err instanceof BusinessException) throw err;
      throw new BusinessException('Refresh token inválido o expirado.', 401);
    }
  }
}