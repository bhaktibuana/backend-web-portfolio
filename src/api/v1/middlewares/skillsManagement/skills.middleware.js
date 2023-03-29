const { skillsModel } = require("../../models");
const { connectionError } = require("../../utils");

const { Skills } = skillsModel;

const checkIdIncrement = (req, res, next) => {
  Skills.findAll({ order: [["id", "DESC"]], attributes: ["id"], limit: 1 })
    .then((results) => {
      if (results.length) {
        const lastIncrement = parseInt(results[0].id.split("-")[1]);
        res.locals.incrementId = lastIncrement + 1;
        next();
      } else {
        res.locals.incrementId = 1;
        next();
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  checkIdIncrement,
};
