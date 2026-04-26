import { Router, Request, Response, NextFunction } from 'express';
import { AuthService } from '../../../Microservicio.Security.Business/Services/AuthService';
import { LoginRequest } from '../../../Microservicio.Security.Business/DTOs/Auth/LoginRequest';
import { createApiResponse } from '../../Models/Common/ApiResponse';
import { createAuthMiddleware } from '../../Extensions/AuthenticationExtensions';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación y gestión de tokens JWT
 */
export function createAuthController(authService: AuthService): Router {
  const router = Router();
  const authenticate = createAuthMiddleware(authService);

  /**
   * @swagger
   * /api/v1/auth/login:
   *   post:
   *     summary: Iniciar sesión y obtener tokens JWT
   *     tags: [Auth]
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [email, password]
   *             properties:
   *               email:
   *                 type: string
   *                 format: email
   *                 example: usuario@email.com
   *               password:
   *                 type: string
   *                 minLength: 6
   *                 example: secreto123
   *     responses:
   *       200:
   *         description: Login exitoso, retorna access y refresh tokens
   *       401:
   *         description: Credenciales inválidas
   *       422:
   *         description: Error de validación
   */
  router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const request: LoginRequest = req.body;
      const response = await authService.login(request);
      res.status(200).json(createApiResponse(response, 'Login exitoso.'));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/auth/refresh:
   *   post:
   *     summary: Renovar el access token usando el refresh token
   *     tags: [Auth]
   *     security: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [refreshToken]
   *             properties:
   *               refreshToken:
   *                 type: string
   *     responses:
   *       200:
   *         description: Access token renovado exitosamente
   *       401:
   *         description: Refresh token inválido o expirado
   */
  router.post('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.status(400).json({ success: false, message: 'refreshToken es requerido.' });
        return;
      }
      const result = await authService.refreshToken(refreshToken);
      res.status(200).json(createApiResponse(result, 'Token renovado exitosamente.'));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @swagger
   * /api/v1/auth/me:
   *   get:
   *     summary: Obtener los datos del usuario autenticado
   *     tags: [Auth]
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Datos del usuario autenticado desde el token
   *       401:
   *         description: No autenticado o token inválido
   */
  router.get('/me', authenticate, (req: Request, res: Response) => {
    res.status(200).json(createApiResponse(req.currentUser, 'Usuario autenticado.'));
  });

  return router;
}
