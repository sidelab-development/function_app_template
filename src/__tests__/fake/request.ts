import { HttpRequest } from '@azure/functions';

const requestFake = {
  body: {},
  params: {},
  query: {},
  headers: {},
} as HttpRequest;

export const generateRequestFake = () => JSON.parse(JSON.stringify(requestFake));
