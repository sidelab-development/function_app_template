const { getAbsolutePath } = require('./utils');

const EXCLUDE_DIRS = ['utils', 'middlewares'];
const HANDLERS_DIR = 'src/app/handlers/functions';
const HANDLERS_ABSOLUTE_PATH = getAbsolutePath(HANDLERS_DIR);

module.exports = {
  HANDLERS_DIR,
  HANDLERS_ABSOLUTE_PATH,
  EXCLUDE_DIRS,
};
