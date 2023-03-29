const { skillsModel } = require("../../models");
const { connectionError, response, removeFile } = require("../../utils");
const sizeOf = require("image-size");
const path = require("path");

const { Skills } = skillsModel;

const checkIdIncrement = async (req, res, next) => {
  try {
    const skillsResult = await Skills.findAll({
      order: [["id", "DESC"]],
      attributes: ["id"],
      limit: 1,
    });

    if (skillsResult.length) {
      const lastIncrement = parseInt(skillsResult[0].id.split("-")[1]);
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

const checkImageDimension = async (req, res, next) => {
  const { image_path } = req.body;
  const appDir = path.dirname(require.main.filename);
  const imagePath = path.join(`${appDir}/public`, image_path);

  try {
    const dimensions = await sizeOf(imagePath);
    if (dimensions.width <= 90 && dimensions.height <= 90) {
      next();
    } else {
      removeFile(image_path);
      response("Image dimensions should not exceed 90x90px", 400, null, res);
    }
  } catch (error) {
    response("Error while reading the image", 500, null, res);
  }
};

module.exports = {
  checkIdIncrement,
  checkImageDimension,
};
