import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { handleError, HTTP_STATUS_CODE } from 'sidelab-http-exceptions';
import handleResponse from '../../utils/handle-response';

const handler: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
  const { id } = req.params;
  try {
    const response = { id };
    context.res = handleResponse(response, HTTP_STATUS_CODE.GET);
  } catch (error) {
    context.res = handleError(error, context);
  }
};

// ts-prune-ignore-next
export default handler;
