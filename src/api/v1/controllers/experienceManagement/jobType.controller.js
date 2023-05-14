const { jobTypeModel } = require("../../models");
const { connectionError, response, generateId } = require("../../utils");

const { JobType } = jobTypeModel;

const getData = async (req, res) => {
  try {
    const results = await JobType.findAll();

    if (results.length) {
      response("Job type data", 200, results, res);
    } else {
      response("Job type data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const createData = async (req, res) => {
  const params = req.body;
  const id = generateId("job type", res.locals.incrementId);

  const payload = {
    id,
    name: params.name,
  };

  try {
    const results = await JobType.create(payload);

    if (results) {
      response("Create job type success", 201, results, res);
    } else {
      response("Create job type failed", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  createData,
};
