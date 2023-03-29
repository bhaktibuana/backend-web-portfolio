const { skillsModel } = require("../../models");
const { connectionError, generateId, response } = require("../../utils");

const { Skills } = skillsModel;

const getData = (req, res) => {
  Skills.findAll({
    order: [["order", "ASC"]],
  })
    .then((results) => {
      if (results.length) {
        response("Skills data", 200, results, res);
      } else {
        response("Skills data not found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const createData = (req, res) => {
  const id = generateId("skills", res.locals.incrementId);

  response("Skills", 200, id, res);
};

module.exports = {
  getData,
  createData,
};
