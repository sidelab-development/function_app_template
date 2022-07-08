const {
  readdirSync, rmSync, existsSync, mkdirSync, copyFile, writeFile,
} = require('fs');
const { copySync } = require('fs-extra');
const path = require('path');
const dash = require('dashargs');

const getAbsolutePath = (__path) => path.join(process.cwd(), __path);

const pathExists = (path) => existsSync(path);

const getDirectories = (source, excludeDirs) => readdirSync(source, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)
  .filter((dirent) => !excludeDirs.includes(dirent));

const createDirectory = (dirPath) => {
  if (!pathExists(dirPath)) mkdirSync(dirPath);
};

const deleteDirectories = (dirNames) => {
  dirNames.forEach((dir) => rmSync(getAbsolutePath(dir), { recursive: true, force: true }));
};

const copyDirectorySync = (originPath, destiyPath) => {
  if (pathExists(originPath)) {
    copySync(originPath, destiyPath, { overwrite: true }, (err) => {
      if (err) throw err;
    });
  }
};

const copyFileSync = (originPath, destiyPath) => {
  if (pathExists(originPath)) {
    copyFile(originPath, destiyPath, (err) => {
      if (err) throw err;
    });
  }
};

const writeFileSync = (filePath, data) => {
  writeFile(filePath, data, (err) => {
    if (err) throw err;
  });
};

const readAndParseArguments = (args) => {
  let command = '';
  args.forEach((arg) => {
    if (!arg.includes('-')) command += `'${arg}'`;
    else command += arg;
    command += ' ';
  });

  const parsed = dash.parse(command);
  return parsed;
};

module.exports = {
  getAbsolutePath,
  pathExists,
  createDirectory,
  deleteDirectories,
  getDirectories,
  copyDirectorySync,
  copyFileSync,
  writeFileSync,
  readAndParseArguments,
};
