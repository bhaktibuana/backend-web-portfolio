const { skillsModel } = require("../../models");
const { connectionError, generateId, response } = require("../../utils");

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

const createData = async (req, res) => {
  const id = generateId("skills", res.locals.incrementId);

  response("Skills", 200, id, res);
};

module.exports = {
  getData,
  createData,
};
