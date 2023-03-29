const moment = require("moment");
const { skillsModel } = require("../../models");
const { connectionError, generateId, response } = require("../../utils");
const { imageUploader } = require("../../services");

const { Skills } = skillsModel;

const getData = async (req, res) => {
  try {
    const skillsResult = await Skills.findAll({
      order: [["order", "ASC"]],
    });

    if (skillsResult.length) {
      response("Skills data", 200, skillsResult, res);
    } else {
      response("Skills data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const uploadImage = async (req, res) => {
  const { upload, payload } = await imageUploader();
  upload(req, res, (error) => {
    if (!error) {
      response("Upload image success", 201, payload, res);
    } else {
      response("Failed to upload image", 500, null, res);
    }
  });
};

const createData = async (req, res) => {
  const params = req.body;
  const id = generateId("skills", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const createdBy = res.locals.tokenPayload.username;

  const payload = {
    id,
    title: params.title,
    image_path: params.image_path,
    source_link: params.source_link,
    order: params.order,
    created_at: createdAt,
    created_by: createdBy,
    updated_at: createdAt,
    updated_by: createdBy,
    is_deleted: false,
  };

  try {
    const skillsResult = await Skills.create(payload);

    if (skillsResult) {
      response("Create skill success", 201, skillsResult, res);
    } else {
      response("Create skill failed", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  uploadImage,
  createData,
};
