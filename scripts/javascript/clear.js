const {
  HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS, COLORS,
} = require('./constants');
const { deleteDirectories, getDirectories } = require('./utils');

const dirs = getDirectories(HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS);
deleteDirectories(dirs);
console.log(`${COLORS.GREEN}Function directories cleaned!${COLORS.RESET}`);
