const {
  deleteDirectories,
  getDirectories,
  getAbsolutePath,
  copyDirectorySync,
  createDirectory,
  writeFileSync,
  copyFileSync,
  pathExists,
} = require('./utils');

const { HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS, HANDLERS_DIR } = require('./constants');
const { generateFunctionsDirectories } = require('./start');

const ZIP_DIR = '.zip';

// ================ STEP 1 - CREATE ZIP DIRECTORY STRUCTURE ================
// Create zip dir
const destinyDir = getAbsolutePath(ZIP_DIR);
createDirectory(destinyDir);

// Copy src bundle to zip dir
const srcOrigin = getAbsolutePath('.webpack/src');
const srcDest = getAbsolutePath(`${ZIP_DIR}/src`);
copyDirectorySync(srcOrigin, srcDest);

// Copy webpack package to zip dir
const pkgOrigin = getAbsolutePath('.webpack/package.json');
const pkgDest = getAbsolutePath(`${ZIP_DIR}/package.json`);
copyFileSync(pkgOrigin, pkgDest);

// ================ STEP 2 - ADD FUNCTIONS DIRECTORIES TO ZIP FOLDER ================
// Get handler dirs
const dirs = getDirectories(HANDLERS_ABSOLUTE_PATH, EXCLUDE_DIRS);

// Generate functions directories on project root
generateFunctionsDirectories(dirs);

// Move functions directories to zip dir
dirs.forEach((dir) => {
  const destinyDir = getAbsolutePath(dir);
  createDirectory(destinyDir);

  const origin = getAbsolutePath(dir);
  const destiny = getAbsolutePath(`${ZIP_DIR}/${dir}`);
  copyDirectorySync(origin, destiny);
});

// ================ STEP 3 - UPDATE FUNCTION.JSON FILES IN ZIP FOLDER ================
// Edit 'scriptFile' on function.json files
dirs.forEach((dir) => {
  const functionJSONPath = getAbsolutePath(`${ZIP_DIR}/${dir}/function.json`);

  if (pathExists(functionJSONPath)) {
    const functionJSON = require(functionJSONPath);
    functionJSON.scriptFile = `../${HANDLERS_DIR}/${dir}.js`;

    writeFileSync(functionJSONPath, JSON.stringify(functionJSON));
  }
});

// ================ STEP 4 - DELETE FUNCTIONS DIRECTORIES THAT ARE LEFT ================
// Delete function directories from project root
deleteDirectories(dirs);
