import Joi from 'joi';

export const createUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
}).required();
