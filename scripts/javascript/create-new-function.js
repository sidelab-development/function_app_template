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
    throw new Error('Provide a name');
  }

  const name = __name || __n;
  return name.replace(/ /g, '-');
};

const readMethod = () => {
  const __method = parsed.get('method');
  const __m = parsed.get('m');

  if (!__method && !__m) {
    throw new Error('Provide a method');
  }

  const method = __method || __m;

  if (!ALLOWED_METHODS.includes(method.toLowerCase())) {
    throw new Error('Provide a valid method');
  }
  return method;
};

const readTrigger = () => {
  const __trigger = parsed.get('trigger');
  const __t = parsed.get('t');

  if (!__trigger && !__t) {
    throw new Error('Provide a trigger');
  }

  const trigger = __trigger || __t;

  if (HTTP_TRIGGERS.includes(trigger.toLowerCase())) return TRIGGERS.HTTP;

  if (EVENT_HUB_TRIGGERS.includes(trigger.toLowerCase())) return TRIGGERS.EVENTHUB;

  if (SERVICE_BUS_TRIGGERS.includes(trigger.toLowerCase())) return TRIGGERS.SERVICEBUS;

  throw new Error('Provide a valid trigger');
};

const generateFunctionJSON = (name, method, trigger) => {
  const cleanedName = name.replace(/-/g, '').replace(/_/g, '');

  if (trigger === TRIGGERS.HTTP) return FUNCTION_JSON_TEMPLATES.http(name, method, cleanedName);

  if (trigger === TRIGGERS.EVENTHUB) return FUNCTION_JSON_TEMPLATES.eventhub(name, cleanedName);

  if (trigger === TRIGGERS.SERVICEBUS) return FUNCTION_JSON_TEMPLATES.servicebus(name, cleanedName);

  throw new Error('Provide a valid trigger');
};

const createFunctionDirectory = (name) => {
  const functionDirectoryPath = getAbsolutePath(`${HANDLERS_DIR}/${name}`);
  if (pathExists(functionDirectoryPath)) {
    throw new Error('Function already exists');
  } else createDirectory(functionDirectoryPath);
};

const addFunctionJSONFile = (name, method, trigger) => {
  const functionJSONPath = getAbsolutePath(`${HANDLERS_DIR}/${name}/function.json`);
  const functionJSON = generateFunctionJSON(name, method, trigger);
  writeFileSync(functionJSONPath, functionJSON);
};

const addIndexFile = (name) => {
  const indexTSPath = getAbsolutePath(`${HANDLERS_DIR}/${name}/index.ts`);
  writeFileSync(indexTSPath, TEMPLATE_HANDLER_INDEX);
};

const name = readName();
const method = readMethod();
const trigger = readTrigger();

createFunctionDirectory(name);
addFunctionJSONFile(name, method, trigger);
addIndexFile(name);
