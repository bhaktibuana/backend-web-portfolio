const { experienceModel } = require("../../models");
const { response, connectionError } = require("../../utils");

const { Experience } = experienceModel;

const checkIdIncrement = async (req, res, next) => {
  try {
    const results = await Experience.findAll({
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

const checkIdExist = async (req, res, next) => {
  const { id } = req.query;

  try {
    const results = Experience.findOne({ where: { id } });

    if (results) {
      next();
    } else {
      response("Selected experience data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  checkIdIncrement,
  checkIdExist,
};
