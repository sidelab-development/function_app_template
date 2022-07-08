import Joi from 'joi';
import { IGenericObject } from '../interfaces/generic-object';
import { IValidator } from './interface';

export class Validator implements IValidator<
  Joi.ObjectSchema,
  Joi.AsyncValidationOptions
> {
  async validateAsync(
    schema: Joi.ObjectSchema,
    payload: IGenericObject,
    options?: Joi.AsyncValidationOptions
  ): Promise<void> {
    await schema.validateAsync(payload, options);
  }
}
