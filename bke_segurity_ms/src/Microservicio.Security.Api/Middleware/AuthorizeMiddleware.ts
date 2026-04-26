// src/Microservicio.Security.Api/Middleware/AuthorizeMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { BusinessException } from '../../Microservicio.Security.Business/Exceptions/BusinessException';

export const authorize = (rolesPermitidos: string[]) => {
  // 🚨 REVISA QUE ESTE RETURN ESTÉ AQUÍ
  return (req: Request, res: Response, next: NextFunction) => {
    const usuarioLogueado = (req as any).user;

    if (!usuarioLogueado) {
      throw new BusinessException('No autorizado. Token no encontrado.', 401);
    }

    const tienePermiso = usuarioLogueado.roles.some((rol: string) => 
      rolesPermitidos.includes(rol)
    );

    if (!tienePermiso) {
      throw new BusinessException('No tienes permisos para realizar esta acción.', 403);
    }

    next();
  };
};