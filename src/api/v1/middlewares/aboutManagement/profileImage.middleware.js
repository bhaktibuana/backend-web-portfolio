const { profileImageModel } = require("../../models");
const { connectionError, response, removeFile } = require("../../utils");
const sizeOf = require("image-size");
const path = require("path");

const { ProfileImage } = profileImageModel;

const checkIdIncrement = async (req, res, next) => {
  try {
    const results = await ProfileImage.findAll({
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

const checkImageRatio = async (req, res, next) => {
  const { image_path } = req.body;
  const appDir = path.dirname(require.main.filename);
  const imagePath = path.join(`${appDir}/public`, image_path);
  const targetRatio = 3 / 4;

  try {
    const dimensions = await sizeOf(imagePath);
    const imageRatio = dimensions.width / dimensions.height;
  
    if (
      imageRatio <= targetRatio + 0.001 &&
      imageRatio >= targetRatio - 0.001
    ) {
      next();
    } else {
      removeFile(image_path);
      response("Image ratio must be 3 : 4 (potrait)", 400, null, res);
    }
  } catch (error) {
    response("Error while reading the image", 500, null, res);
  }
};

const setAllDataInactive = async (req, res, next) => {
  const payload = {
    inactive: true,
  };

  try {
    const results = await ProfileImage.update(payload, {
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
  checkImageRatio,
  setAllDataInactive,
};
