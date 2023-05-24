const path = require("path");
const fs = require("fs");

const targetFilePath = (fileType, folderName, fileName) => {
  const filePath = path
    .join(`./${fileType}s/${folderName}`, `./${fileName}`)
    .split("\\")
    .join("/");
  return `/${filePath}`;
};

const uploadFilePath = (fileType, folderName) => {
  const appDir = process.cwd();
  const baseDir = path.join(appDir, `./public/${fileType}s`);
  const fileDir = path.join(baseDir, `./${folderName}`);

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);

  return fileDir;
};

module.exports = {
  targetFilePath,
  uploadFilePath,
};
