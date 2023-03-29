const path = require("path");
const fs = require("fs");

const removeFile = (filePath) => {
  const appDir = path.dirname(require.main.filename);
  const fileDir = path.join(`${appDir}/public`, filePath);

  fs.unlink(fileDir, (error) => {
    if (error) {
      return;
    }

    return;
  });
};

module.exports = removeFile;
