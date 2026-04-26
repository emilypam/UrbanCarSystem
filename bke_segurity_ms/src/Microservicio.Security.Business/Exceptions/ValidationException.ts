import { BusinessException } from './BusinessException';

export interface ValidationError {
  field: string;
  message: string;
}

export class ValidationException extends BusinessException {
  public readonly errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('Error de validación en los datos proporcionados.', 422);
    this.name = 'ValidationException';
    this.errors = errors;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }
}
