const { HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS, HANDLERS_DIR } = require('./constants');
const { getDirectories } = require('./utils');

const entries = {};

const dirs = getDirectories(HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS);

dirs.forEach((dir) => {
  const key = `./${HANDLERS_DIR}/${dir}`;
  const value = `./${HANDLERS_DIR}/${dir}/index.ts`;
  entries[key] = value;
});

module.exports = {
  entries,
};
