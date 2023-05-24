const path = require("path");
const fs = require("fs");

const removeFile = (filePath) => {
  const appDir = process.cwd();
  const fileDir = path.join(`${appDir}/public`, filePath);

  fs.unlink(fileDir, (error) => {
    if (error) {
      return;
    }

    return;
  });
};

module.exports = removeFile;
