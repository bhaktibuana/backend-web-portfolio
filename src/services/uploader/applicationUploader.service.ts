import multer, { FileFilterCallback } from "multer";
import {
  generateTargetFilePath,
  generateUploadFilePath,
  generateFileName,
} from "../../utils";
import { ApplicationPayloadIface } from "./interfaces";

export const applicationUploader = async (folderName: string) => {
  const payload: ApplicationPayloadIface = {
    fileName: "",
    mimeType: "",
    filePath: "",
  };

  const fileFilter = (req: any, file: any, callback: FileFilterCallback) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "application") {
      payload.mimeType = file.mimetype;
      callback(null, true);
    } else {
      req.fileValidationError = "Wrong file type";
      return callback(new Error(req.fileValidationError));
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(
        null,
        generateUploadFilePath(file.mimetype.split("/")[0], folderName)
      );
    },
    filename: (req, file, callback) => {
      const newFileName = generateFileName(file.originalname);
      payload.fileName = newFileName;
      payload.filePath = generateTargetFilePath(
        file.mimetype.split("/")[0],
        folderName,
        newFileName
      );
      callback(null, newFileName);
    },
  });

  const upload = multer({ storage, fileFilter }).single("application");
  return { upload, payload };
};
