import Joi from 'joi';

const base = Joi.object({
  modeloId: Joi.string().uuid().optional(),
  categoriaId: Joi.string().uuid().optional(),
  combustibleId: Joi.string().uuid().optional(),
  transmisionId: Joi.string().uuid().optional(),
  estadoId: Joi.string().uuid().optional(),
  placa: Joi.string().max(20).required(),
  anio: Joi.number().integer().min(1900).max(2100).required(),
  color: Joi.string().max(50).optional(),
  precioDia: Joi.number().positive().required(),
  kilometraje: Joi.number().integer().min(0).optional(),
});

export const VehiculoValidator = {
  crear: base,
  actualizar: base,
};
