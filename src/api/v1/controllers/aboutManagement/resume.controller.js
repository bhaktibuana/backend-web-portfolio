const moment = require("moment");
const { resumeModel } = require("../../models");
const { connectionError, generateId, response } = require("../../utils");
const { applicationUploader } = require("../../services");

const { Resume } = resumeModel;

const getData = async (req, res) => {
  try {
    const results = await Resume.findOne({ where: { inactive: false } });

    if (results) {
      const file_path = `${req.protocol}://${req.get("host")}${
        results.dataValues.file_path
      }`;

      const resultsData = {
        ...results.dataValues,
        file_path,
      };

      response("Resume data", 200, resultsData, res);
    } else {
      response("Resume data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const uploadFile = async (req, res) => {
  const { upload, payload } = await applicationUploader("resume");
  upload(req, res, (error) => {
    if (!error) {
      response("Upload file success", 201, payload, res);
    } else {
      response("Failed to upload file", 500, null, res);
    }
  });
};

const createData = async (req, res) => {
  const params = req.body;
  const id = generateId("resume", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const createdBy = res.locals.tokenPayload.username;

  const payload = {
    id,
    file_path: params.file_path,
    created_at: createdAt,
    created_by: createdBy,
    updated_at: createdAt,
    updated_by: createdBy,
    inactive: false,
  };

  try {
    const results = await Resume.create(payload);

    if (results) {
      response("Create resume success", 201, results, res);
    } else {
      response("Create resume failed", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  uploadFile,
  createData,
};
