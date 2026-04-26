import { Request, Response, NextFunction } from 'express';
import { BusinessException } from '../../Microservicio.Security.Business/Exceptions/BusinessException';
import { NotFoundException } from '../../Microservicio.Security.Business/Exceptions/NotFoundException';
import { ValidationException } from '../../Microservicio.Security.Business/Exceptions/ValidationException';
import { createApiErrorResponse } from '../Models/Common/ApiErrorResponse';

export function exceptionHandlingMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ValidationException) {
    res.status(422).json(createApiErrorResponse('VALIDATION_ERROR', err.message, err.errors));
    return;
  }

  if (err instanceof NotFoundException) {
    res.status(404).json(createApiErrorResponse('NOT_FOUND', err.message));
    return;
  }

  if (err instanceof BusinessException) {
    res.status(err.statusCode).json(createApiErrorResponse('BUSINESS_ERROR', err.message));
    return;
  }

  console.error('[UnhandledError]', err);
  res
    .status(500)
    .json(createApiErrorResponse('INTERNAL_SERVER_ERROR', 'Error interno del servidor.'));
}
