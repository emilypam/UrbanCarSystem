import Joi from 'joi';
import { LoginRequest } from '../DTOs/Auth/LoginRequest';
import { ValidationException, ValidationError } from '../Exceptions/ValidationException';

export class AuthValidator {
  private static readonly loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'El email no tiene un formato válido.',
      'any.required': 'El email es requerido.',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'La contraseña debe tener al menos 6 caracteres.',
      'any.required': 'La contraseña es requerida.',
    }),
  });

  static validateLogin(request: LoginRequest): void {
    const { error } = AuthValidator.loginSchema.validate(request, { abortEarly: false });
    if (error) {
      const errors: ValidationError[] = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      throw new ValidationException(errors);
    }
  }
}
