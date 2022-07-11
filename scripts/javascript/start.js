const { HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS, HANDLERS_DIR } = require('./constants');
const {
  getAbsolutePath, getDirectories, createDirectory, copyFileSync,
} = require('./utils');

const generateFunctionsDirectories = (dirNames) => {
  dirNames.forEach((dir) => {
    const targetDir = getAbsolutePath(dir);
    createDirectory(targetDir);

    const origin = getAbsolutePath(`${HANDLERS_DIR}/${dir}/function.json`);
    const destiny = getAbsolutePath(`${dir}/function.json`);

    copyFileSync(origin, destiny);
  });
};

const dirs = getDirectories(HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS);

generateFunctionsDirectories(dirs);

module.exports = {
  generateFunctionsDirectories,
};
