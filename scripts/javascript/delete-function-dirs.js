const { HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS } = require('./constants');
const { deleteDirectories, getDirectories } = require('./utils');

const dirs = getDirectories(HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS);
deleteDirectories(dirs);
