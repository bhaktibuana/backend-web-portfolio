import moment from "moment";
import { SplitFileNameIface } from "./interfaces";

export const generateFileName = (fileName: string): string => {
  const date = moment().format("YYYYMMDD").toString();
  const time = moment().format("HHmmss").toString();
  const newFileName = fileName.replace(/[^0-9a-zA-Z]/g, "_");
  const fileNameObj = splitFileName(newFileName);

  return `${date}-${time}-${fileNameObj.fileName}.${fileNameObj.fileType}`;
};

const splitFileName = (fileName: string): SplitFileNameIface => {
  const fileNameArr = fileName.split("_");
  const fileType = fileNameArr[fileNameArr.length - 1].toLowerCase();
  fileNameArr.pop();

  return {
    fileName: fileNameArr.join("_"),
    fileType,
  };
};
