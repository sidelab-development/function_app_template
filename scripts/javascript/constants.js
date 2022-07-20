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
      "eventHubName": "${cleanedName.toUpperCase()}_EVENT_HUB_NAME",
      "consumerGroup": "$Default",
      "connection": "${cleanedName.toUpperCase()}_EVENT_HUB_CONNECTION_STRING"
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
      "queueName": "${cleanedName.toUpperCase()}_SERVICEBUS_QUEUE_NAME",
      "connection": "${cleanedName.toUpperCase()}_SERVICEBUS_CONNECTION_STRING",
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

const COLORS = {
  BLACK: '\033[1;30m',
  WHITE: '\033[1;37m',
  GREEN: '\033[1;32m',
  RESET: '\033[0m',
  YELLOW: '\033[0;33m',
  BLUE: '\033[1;34m',
  SPACE: (num) => ' '.repeat(num),
};

const FUNCTION_APP_LOGO = `${COLORS.SPACE(5)}${COLORS.YELLOW}⠀⠀⠀⣴⡶⠂⠀
${COLORS.SPACE(5)}${COLORS.BLUE}⣠⠟${COLORS.YELLOW}⣼⣟⣁${COLORS.BLUE}⡻⣄
${COLORS.SPACE(5)}⠙⢮${COLORS.YELLOW}⢉⡿⠋${COLORS.BLUE}⣴⠋${COLORS.YELLOW}
${COLORS.SPACE(5)}⠀⠀⠞⠁⠀⠀⠀${COLORS.RESET}`;

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
  COLORS,
  FUNCTION_APP_LOGO,
};
