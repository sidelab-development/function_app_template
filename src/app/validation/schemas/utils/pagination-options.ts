import Joi from 'joi';

export const paginationOptionsSchema = Joi.object().keys({
  page: Joi.number().min(1),
  pageLength: Joi.number().min(1),
});
