import Joi from 'joi';
import { CrearUsuarioRequest } from '../DTOs/Usuario/CrearUsuarioRequest';
import { ActualizarUsuarioRequest } from '../DTOs/Usuario/ActualizarUsuarioRequest';
import { ValidationException, ValidationError } from '../Exceptions/ValidationException';

export class UsuarioValidator {
  private static readonly crearSchema = Joi.object({
    usuarioId: Joi.string().uuid().required().messages({
      'string.guid': 'El ID de usuario debe ser un UUID válido.',
      'any.required': 'El ID de usuario es requerido.',
    }),
    email: Joi.string().email().max(255).required().messages({
      'string.email': 'El email no tiene un formato válido.',
      'string.max': 'El email no puede superar los 255 caracteres.',
      'any.required': 'El email es requerido.',
    }),
    nombre: Joi.string().max(100).optional().allow('').messages({
      'string.max': 'El nombre no puede superar los 100 caracteres.',
    }),
  });

  private static readonly actualizarSchema = Joi.object({
    nombre: Joi.string().max(100).optional().allow('', null),
    email: Joi.string().email().max(255).optional(),
  }).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar.',
  });

  static validateCrear(request: CrearUsuarioRequest): void {
    const { error } = UsuarioValidator.crearSchema.validate(request, { abortEarly: false });
    if (error) {
      const errors: ValidationError[] = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      throw new ValidationException(errors);
    }
  }

  static validateActualizar(request: ActualizarUsuarioRequest): void {
    const { error } = UsuarioValidator.actualizarSchema.validate(request, { abortEarly: false });
    if (error) {
      const errors: ValidationError[] = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      throw new ValidationException(errors);
    }
  }
}
