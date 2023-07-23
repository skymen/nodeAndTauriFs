const fs = require("fs").promises;

async function exists(dir) {
  try {
    await fs.access(dir);
    return true;
  } catch {
    return false;
  }
}

function readDir(dir) {
  return fs.readdir(dir);
}

function removeFile(file) {
  return fs.unlink(file);
}

function removeDir(dir) {
  return fs.rmdir(dir);
}

async function isDirectory(file) {
  const stats = await fs.lstat(file);
  return stats.isDirectory();
}

function createDir(dir) {
  return fs.mkdir(dir);
}

async function createFile(file) {
  const fd = await fs.open(file, "w");
  await fd.close();
}

function writeFile(file, data) {
  return fs.writeFile(file, data);
}

function copyFile(src, dest) {
  return fs.copyFile(src, dest);
}

function readFile(file) {
  return fs.readFile(file, "utf8");
}

function readBinaryFile(file) {
  return fs.readFile(file);
}

module.exports = {
  exists,
  readDir,
  removeFile,
  removeDir,
  isDirectory,
  createDir,
  createFile,
  writeFile,
  copyFile,
  readFile,
  readBinaryFile,
};
