const moment = require("moment");
const { profileImageModel } = require("../../models");
const { connectionError, generateId, response } = require("../../utils");
const { imageUploader } = require("../../services");

const { ProfileImage } = profileImageModel;

const getData = async (req, res) => {
  try {
    const results = await ProfileImage.findAll();

    if (results.length) {
      const resultsData = results.map(({ dataValues }) => {
        const image_path = `${req.protocol}://${req.get("host")}${
          dataValues.image_path
        }`;

        return {
          ...dataValues,
          image_path,
        };
      });

      response("Profile image data", 200, resultsData, res);
    } else {
      response("Profile image data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const getActiveData = async (req, res) => {
  try {
    const results = await ProfileImage.findOne({ where: { inactive: false } });

    if (results) {
      const image_path = `${req.protocol}://${req.get("host")}${
        results.dataValues.image_path
      }`;
      
      const resultsData = {
        ...results.dataValues,
        image_path,
      };

      response("Profile image data", 200, resultsData, res);
    } else {
      response("Profile image data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const uploadImage = async (req, res) => {
  const { upload, payload } = await imageUploader("profile");
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
  const id = generateId("profile image", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const createdBy = res.locals.tokenPayload.username;

  const payload = {
    id,
    image_path: params.image_path,
    created_at: createdAt,
    created_by: createdBy,
    updated_at: createdAt,
    updated_by: createdBy,
    inactive: false,
  };

  try {
    const results = await ProfileImage.create(payload);

    if (results) {
      response("Create profile image success", 201, results, res);
    } else {
      response("Create rpfoile image failed", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  getActiveData,
  uploadImage,
  createData,
};
