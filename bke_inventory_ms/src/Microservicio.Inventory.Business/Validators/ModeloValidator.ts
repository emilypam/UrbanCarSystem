import Joi from 'joi';

const base = Joi.object({
  marcaId: Joi.string().uuid().optional(),
  nombre: Joi.string().max(100).required(),
});

export const ModeloValidator = {
  crear: base,
  actualizar: base,
};
