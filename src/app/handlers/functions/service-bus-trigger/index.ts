import { AzureFunction, Context } from '@azure/functions';
import { handleError, HTTP_STATUS_CODE } from 'sidelab-http-exceptions';
import { IGenericObject } from '../../../interfaces/generic-object';
import handleResponse from '../../utils/handle-response';

// ts-prune-ignore-next
const handler: AzureFunction = async (context: Context, serviceBusMessage: IGenericObject): Promise<void> => {
  const { id } = serviceBusMessage;

  try {
    const response = { id };
    context.res = handleResponse(response, HTTP_STATUS_CODE.GET);
  } catch (error) {
    context.res = handleError(error, context);
  }
};

// ts-prune-ignore-next
export default handler;
