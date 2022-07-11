const { HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS, COLORS } = require('./constants');
const { getDirectories, pathExists, getAbsolutePath } = require('./utils');

const dirs = getDirectories(HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS);

dirs.forEach((dir) => {
  const pathDir = getAbsolutePath(dir);
  if (pathExists(pathDir)) {
    console.log(`${COLORS.WHITE}Remove function directories before commit!${COLORS.RESET}`);
    process.exit(1);
  }
});
