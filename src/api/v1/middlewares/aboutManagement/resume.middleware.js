const { resumeModel } = require("../../models");
const { connectionError, response, removeFile } = require("../../utils");
const path = require("path");

const { Resume } = resumeModel;

const checkIdIncrement = async (req, res, next) => {
  try {
    const results = await Resume.findAll({
      order: [["id", "DESC"]],
      attributes: ["id"],
      limit: 1,
    });

    if (results.length) {
      const lastIncrement = parseInt(results[0].id.split("-")[1]);
      res.locals.incrementId = lastIncrement + 1;
      next();
    } else {
      res.locals.incrementId = 1;
      next();
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const checkFileType = (req, res, next) => {
  const { file_path } = req.body;
  const appDir = process.cwd();
  const filePath = path.join(`${appDir}/public`, file_path);

  try {
    const fileType = path.extname(filePath);

    if (fileType === ".pdf") {
      next();
    } else {
      removeFile(file_path);
      response("Document must be .pdf", 400, null, res);
    }
  } catch (error) {
    response("Error while reading the file", 500, null, res);
  }
};

const setAllDataInactive = async (req, res, next) => {
  const payload = {
    inactive: true,
  };

  try {
    const results = await Resume.update(payload, {
      where: { inactive: false },
      returning: true,
      plain: true,
    });

    results.splice(results.indexOf(undefined), 1);

    if (results.length) {
      next();
    } else {
      response("Failed to set inactive data", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  checkIdIncrement,
  setAllDataInactive,
  checkFileType,
};
