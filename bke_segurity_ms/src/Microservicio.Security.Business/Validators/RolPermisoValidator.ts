import Joi from 'joi';
import { CrearRolPermisoRequest } from '../DTOs/RolPermiso/CrearRolPermisoRequest';
import { ActualizarRolPermisoRequest } from '../DTOs/RolPermiso/ActualizarRolPermisoRequest';
import { ValidationException, ValidationError } from '../Exceptions/ValidationException';

export class RolPermisoValidator {
  private static readonly crearSchema = Joi.object({
    nombre: Joi.string().max(50).required().messages({
      'string.max': 'El nombre del rol no puede superar los 50 caracteres.',
      'any.required': 'El nombre del rol es requerido.',
    }),
    descripcion: Joi.string().optional().allow('', null),
  });

  private static readonly actualizarSchema = Joi.object({
    nombre: Joi.string().max(50).optional(),
    descripcion: Joi.string().optional().allow('', null),
  }).min(1).messages({
    'object.min': 'Debe proporcionar al menos un campo para actualizar.',
  });

  static validateCrear(request: CrearRolPermisoRequest): void {
    const { error } = RolPermisoValidator.crearSchema.validate(request, { abortEarly: false });
    if (error) {
      const errors: ValidationError[] = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      throw new ValidationException(errors);
    }
  }

  static validateActualizar(request: ActualizarRolPermisoRequest): void {
    const { error } = RolPermisoValidator.actualizarSchema.validate(request, { abortEarly: false });
    if (error) {
      const errors: ValidationError[] = error.details.map((d) => ({
        field: d.path.join('.'),
        message: d.message,
      }));
      throw new ValidationException(errors);
    }
  }
}
