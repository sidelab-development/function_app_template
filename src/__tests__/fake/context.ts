import { Context } from '@azure/functions';

export const contextFake = {
  res: {},
  done: () => undefined,
  log: () => undefined,
} as Context;

export const generateContextFake = () => JSON.parse(JSON.stringify(contextFake));
