const moment = require("moment");
const { aboutModel } = require("../../models");
const { connectionError, response } = require("../../utils");

const { About } = aboutModel;

const getData = async (req, res) => {
  try {
    const results = await About.findOne({ where: { inactive: false } });

    if (results) {
      response("About data", 200, results, res);
    } else {
      response("About data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const updateData = async (req, res) => {
  const { description } = req.body;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const updatedBy = res.locals.tokenPayload.username;

  const payload = {
    description,
    updated_at: updatedAt,
    updated_by: updatedBy,
  };

  try {
    const results = await About.update(payload, {
      where: { inactive: false },
      returning: true,
      plain: true,
    });

    results.splice(results.indexOf(undefined), 1);

    if (results.length) {
      response("Update about data success", 201, results, res);
    } else {
      response("Failed to update about data", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  updateData,
};
