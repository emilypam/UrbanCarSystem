import Joi from 'joi';

const base = Joi.object({
  vehiculoId: Joi.string().uuid().optional(),
  fecha: Joi.string().isoDate().required(),
  descripcion: Joi.string().required(),
  costo: Joi.number().min(0).optional(),
  siguienteKm: Joi.number().integer().min(0).optional(),
});

export const MantenimientoValidator = {
  crear: base,
  actualizar: base,
};
