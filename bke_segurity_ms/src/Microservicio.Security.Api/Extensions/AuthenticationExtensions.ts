import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../../Microservicio.Security.Business/Services/AuthService';
import { createApiErrorResponse } from '../Models/Common/ApiErrorResponse';

declare global {
  namespace Express {
    interface Request {
      currentUser?: { usuarioId: string; email: string; roles: string[] };
    }
  }
}

export function createAuthMiddleware(authService: AuthService) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res
        .status(401)
        .json(createApiErrorResponse('UNAUTHORIZED', 'Token de autenticación requerido.'));
      return;
    }

    const token = authHeader.substring(7);
    try {
      req.currentUser = await authService.validateToken(token);
      next();
    } catch {
      res.status(401).json(createApiErrorResponse('UNAUTHORIZED', 'Token inválido o expirado.'));
    }
  };
}

export function requireRoles(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.currentUser) {
      res.status(401).json(createApiErrorResponse('UNAUTHORIZED', 'No autenticado.'));
      return;
    }
    const hasRole = roles.some((r) => req.currentUser!.roles.includes(r));
    if (!hasRole) {
      res.status(403).json(createApiErrorResponse('FORBIDDEN', 'Permisos insuficientes.'));
      return;
    }
    next();
  };
}
