const { skillsModel } = require("../../models");
const { connectionError } = require("../../utils");

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

module.exports = {
  checkIdIncrement,
};
