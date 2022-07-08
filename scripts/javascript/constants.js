const { getAbsolutePath } = require('./utils');

const EXCLUDE_DIRS = ['utils', 'middlewares'];
const HANDLERS_DIR = 'src/app/handlers/functions';
const HANDLERS_ABSOLUTE_PATH = getAbsolutePath(HANDLERS_DIR);

const TEMPLATE_HANDLER_INDEX = `import { AzureFunction, Context } from '@azure/functions';
import { handleError } from 'sidelab-http-exceptions';
import handleResponse from '../../utils/handle-response';

const handler: AzureFunction = async (context: Context): Promise<void> => {
  try {
    const response = { };
    context.res = handleResponse(response);
  } catch (error) {
    context.res = handleError(error, context);
  }
};

// ts-prune-ignore-next
export default handler;
`;

const FUNCTION_JSON_TEMPLATES = {
  http: (name, method, route) => `{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["${method}"],
      "route": "${route}"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ],
  "scriptFile": "../.webpack/src/app/handlers/functions/${name}.js"
}`,
  eventhub: (name, cleanedName) => `{
  "disabled": false,
  "bindings": [
    {
      "type": "eventHubTrigger",
      "direction": "in",
      "name": "${cleanedName}eventHubMessages",
      "eventHubName": "EVENT_HUB_NAME",
      "consumerGroup": "$Default",
      "connection": "EVENT_HUB_CONNECTION_STRING"
    }
  ],
  "scriptFile": "../.webpack/src/app/handlers/functions/${name}.js"
}`,
  servicebus: (name, cleanedName) => `{
  "disabled": false,
  "bindings": [
    {
      "type": "serviceBusTrigger",
      "direction": "in",
      "name": "${cleanedName}QueueTrigger",
      "queueName": "SERVICEBUS_QUEUE_NAME",
      "connection": "SERVICEBUS_CONNECTION_STRING",
      "accessRights": "manage"
    }
  ],
  "scriptFile": "../.webpack/src/app/handlers/functions/${name}.js"
}`,
};

const TRIGGERS = {
  HTTP: 'http',
  EVENTHUB: 'eventhub',
  SERVICEBUS: 'servicebus',
};
const HTTP_TRIGGERS = ['h', 'ht', 'http'];
const EVENT_HUB_TRIGGERS = ['eh', 'eventhub', 'event_hub'];
const SERVICE_BUS_TRIGGERS = ['sb', 'servicebus', 'service_bus'];

const ALLOWED_METHODS = ['get', 'post', 'put', 'patch', 'delete'];

module.exports = {
  HANDLERS_DIR,
  HANDLERS_ABSOLUTE_PATH,
  EXCLUDE_DIRS,
  TEMPLATE_HANDLER_INDEX,
  FUNCTION_JSON_TEMPLATES,
  HTTP_TRIGGERS,
  EVENT_HUB_TRIGGERS,
  SERVICE_BUS_TRIGGERS,
  TRIGGERS,
  ALLOWED_METHODS,
};
