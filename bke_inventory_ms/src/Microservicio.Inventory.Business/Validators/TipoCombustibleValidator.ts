import Joi from 'joi';

const base = Joi.object({ nombre: Joi.string().max(50).required() });

export const TipoCombustibleValidator = {
  crear: base,
  actualizar: base,
};
