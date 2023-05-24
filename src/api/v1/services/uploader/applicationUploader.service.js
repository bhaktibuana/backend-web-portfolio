const multer = require("multer");
const { generateFileName, generateFilePath } = require("../../utils");

const { uploadFilePath, targetFilePath } = generateFilePath;

const applicationUpploader = async (folderName) => {
  const payload = {
    fileName: null,
    mimeType: null,
    filePath: null,
  };

  const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split("/")[0];
    if (fileType === "application") {
      payload.mimeType = file.mimetype;
      cb(null, true);
    } else {
      return cb(new Error("Wrong file type"));
    }
  };

  const storage = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadFilePath(file.mimetype.split("/")[0], folderName));
    },
    filename: (req, file, callback) => {
      const newFileName = generateFileName(file.originalname);
      payload.fileName = newFileName;
      payload.filePath = targetFilePath(
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

module.exports = applicationUpploader;
