const { jobTypeModel } = require("../../models");
const { connectionError } = require("../../utils");

const { JobType } = jobTypeModel;

const checkIdIncrement = async (req, res, next) => {
  try {
    const results = await JobType.findAll({
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

module.exports = {
  checkIdIncrement,
};
