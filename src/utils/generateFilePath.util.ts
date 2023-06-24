import path from "path";
import fs from "fs";

export const generateTargetFilePath = (
  fileType: string,
  folderName: string,
  fileName: string
): string => {
  const filePath = path
    .join(`./${fileType}s/${folderName}`, `./${fileName}`)
    .split("\\")
    .join("/");
  return `/${filePath}`;
};

export const generateUploadFilePath = (
  fileType: string,
  folderName: string
): string => {
  const appDir = process.cwd();
  const baseDir = path.join(appDir, `./public/${fileType}s`);
  const fileDir = path.join(baseDir, `./${folderName}`);

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
  if (!fs.existsSync(fileDir)) fs.mkdirSync(fileDir);

  return fileDir;
};
