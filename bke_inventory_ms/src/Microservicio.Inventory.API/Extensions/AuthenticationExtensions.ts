import { NextFunction, Request, RequestHandler, Response } from 'express';
import jwt from 'jsonwebtoken';

type AuthRequest = Request & { user?: { roles?: string[]; sub?: string; email?: string } };

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Missing or invalid authorization header.' });
    return;
  }
  const token = header.slice(7);
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    res.status(500).json({ success: false, message: 'JWT secret not configured.' });
    return;
  }
  try {
    const payload = jwt.verify(token, secret) as AuthRequest['user'];
    (req as AuthRequest).user = payload;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}

export function authorize(roles: string[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthRequest).user;
    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized.' });
      return;
    }
    const userRoles: string[] = user.roles ?? [];
    if (!roles.some((r) => userRoles.includes(r))) {
      res.status(403).json({ success: false, message: 'Forbidden. Insufficient permissions.' });
      return;
    }
    next();
  };
}
