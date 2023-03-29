const path = require("path");
const fs = require("fs");

const targetFilePath = (fileType, fileName) => {
  const filePath = path
    .join(`./${fileType}s`, `./${fileName}`)
    .split("\\")
    .join("/");
  return `/${filePath}`;
};

const uploadFilePath = (fileType) => {
  const appDir = path.dirname(require.main.filename);
  const fileDir = path.join(appDir, `./public/${fileType}s`);

  if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir);
  }

  return fileDir;
};

module.exports = {
  targetFilePath,
  uploadFilePath,
};
