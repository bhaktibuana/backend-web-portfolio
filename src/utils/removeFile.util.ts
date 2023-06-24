import path from "path";
import fs from "fs";

export const removeFile = (filePath: string): void => {
  const appDir = process.cwd();
  const targetPath = path.join(`${appDir}/public`, filePath);

  fs.unlink(targetPath, (error) => {
    if (error) {
      return;
    }
    return;
  });
};
