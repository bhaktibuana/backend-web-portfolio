const imageUploaderService = require("./uploader/imageUploader.service");
const applicationUpploaderService = require("./uploader/applicationUploader.service");

module.exports = {
  imageUploader: imageUploaderService,
  applicationUploader: applicationUpploaderService,
};
