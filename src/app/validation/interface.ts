import { IGenericObject } from '../interfaces/generic-object';

export interface IValidator<S, O> {
  validateAsync: (
    schema: S,
    payload: IGenericObject,
    options: O
  ) => Promise<void>
}
