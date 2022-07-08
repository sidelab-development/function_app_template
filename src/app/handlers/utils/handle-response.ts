import { HTTP_STATUS_CODE } from 'sidelab-http-exceptions';
import { IGenericObject } from '../../interfaces/generic-object';

const defaultHeader = {
  'Access-Control-Allow-Headers': ['Content-Type', 'contenttype', 'authorization'],
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,PATCH,POST,DELETE',
};

interface IHandledResponse {
  headers: IGenericObject;
  status: number;
  body: any; // eslint-disable-line
}

export default function handleResponse(body: any, status = HTTP_STATUS_CODE.GET): IHandledResponse { // eslint-disable-line
  return {
    headers: defaultHeader,
    status,
    body,
  };
}
