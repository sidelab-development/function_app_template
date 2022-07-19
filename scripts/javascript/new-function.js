/* eslint-disable no-underscore-dangle */
const {
  HANDLERS_DIR,
  TEMPLATE_HANDLER_INDEX,
  FUNCTION_JSON_TEMPLATES,
  HTTP_TRIGGERS,
  EVENT_HUB_TRIGGERS,
  SERVICE_BUS_TRIGGERS,
  TRIGGERS,
  ALLOWED_METHODS,
  COLORS,
  FUNCTION_APP_LOGO,
} = require('./constants');

const {
  getAbsolutePath,
  createDirectory,
  writeFileSync,
  pathExists,
  readAndParseArguments,
} = require('./utils');

const args = process.argv.slice(2);
const parsed = readAndParseArguments(args);

const readName = () => {
  const __name = parsed.get('name');
  const __n = parsed.get('n');

  if (!__name && !__n) {
    console.error('Provide a name!');
    process.exit(1);
  }

  const name = __name || __n;
  return name.replace(/ /g, '-');
};

const readMethod = () => {
  const __method = parsed.get('method');
  const __m = parsed.get('m');

  if (!__method && !__m) {
    console.error('Provide a method!');
    process.exit(1);
  }

  const method = __method || __m;

  if (!ALLOWED_METHODS.includes(method.toLowerCase())) {
    console.error('Provide a valid method!');
    process.exit(1);
  }
  return method;
};

const readTrigger = () => {
  const __trigger = parsed.get('trigger');
  const __t = parsed.get('t');

  if (!__trigger && !__t) {
    console.error('Provide a trigger!');
    process.exit(1);
  }

  const trigger = __trigger || __t;

  if (HTTP_TRIGGERS.includes(trigger.toLowerCase())) return TRIGGERS.HTTP;

  if (EVENT_HUB_TRIGGERS.includes(trigger.toLowerCase())) return TRIGGERS.EVENTHUB;

  if (SERVICE_BUS_TRIGGERS.includes(trigger.toLowerCase())) return TRIGGERS.SERVICEBUS;

  console.error('Provide a valid trigger!');
  return process.exit(1);
};

const readRoute = () => {
  const __name = parsed.get('route');
  const __n = parsed.get('r');

  if (!__name && !__n) {
    return null;
  }

  const name = __name || __n;
  return name.replace(/ /g, '-');
};

const generateFunctionJSON = (name, method, trigger, route) => {
  const cleanedName = name.replace(/-/g, '').replace(/_/g, '');

  if (trigger === TRIGGERS.HTTP) return FUNCTION_JSON_TEMPLATES.http(name, method, route);

  if (trigger === TRIGGERS.EVENTHUB) return FUNCTION_JSON_TEMPLATES.eventhub(name, cleanedName);

  if (trigger === TRIGGERS.SERVICEBUS) return FUNCTION_JSON_TEMPLATES.servicebus(name, cleanedName);

  console.error('Provide a valid trigger!');
  return process.exit(1);
};

const createFunctionDirectory = (name) => {
  const functionDirectoryPath = getAbsolutePath(`${HANDLERS_DIR}/${name}`);
  if (pathExists(functionDirectoryPath)) {
    console.error('Function already exists!');
    process.exit(1);
  } else createDirectory(functionDirectoryPath);
};

const addFunctionJSONFile = (name, method, trigger, route) => {
  const functionJSONPath = getAbsolutePath(`${HANDLERS_DIR}/${name}/function.json`);
  const functionJSON = generateFunctionJSON(name, method, trigger, route);
  writeFileSync(functionJSONPath, functionJSON);
};

const addIndexFile = (name) => {
  const indexTSPath = getAbsolutePath(`${HANDLERS_DIR}/${name}/index.ts`);
  writeFileSync(indexTSPath, TEMPLATE_HANDLER_INDEX);
};

const showLog = (name, method, trigger) => {
  console.log(FUNCTION_APP_LOGO);
  console.log(`${COLORS.BLACK}Name:${COLORS.RESET} ${name}`);
  if (trigger === TRIGGERS.HTTP) console.log(`${COLORS.BLACK}Method:${COLORS.RESET} ${method.toUpperCase()}`);
  console.log(`${COLORS.BLACK}Trigger:${COLORS.RESET} ${trigger}`);
  console.log(`${COLORS.GREEN}Function created!${COLORS.RESET}`);
};

const name = readName();
const trigger = readTrigger();
let method;
let route;
if (trigger === TRIGGERS.HTTP) {
  method = readMethod();
  route = readRoute();
  if (route === null) {
    route = name;
  }
}

createFunctionDirectory(name);
addFunctionJSONFile(name, method, trigger, route);
addIndexFile(name);
showLog(name, method, trigger);
