import { NextFunction, Request, Response } from 'express';
import { BusinessException } from '../../Microservicio.Inventory.Business/Exceptions/BusinessException';
import { NotFoundException } from '../../Microservicio.Inventory.Business/Exceptions/NotFoundException';
import { ValidationException } from '../../Microservicio.Inventory.Business/Exceptions/ValidationException';

export function exceptionHandlingMiddleware(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidationException) {
    res.status(400).json({ success: false, message: err.message, errors: err.errors });
    return;
  }
  if (err instanceof NotFoundException) {
    res.status(404).json({ success: false, message: err.message });
    return;
  }
  if (err instanceof BusinessException) {
    res.status(422).json({ success: false, message: err.message });
    return;
  }
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error.' });
}
