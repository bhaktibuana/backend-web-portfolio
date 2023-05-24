const moment = require("moment");
const { experienceModel, jobTypeModel } = require("../../models");
const { connectionError, response, generateId } = require("../../utils");

const { Experience } = experienceModel;
const { JobType } = jobTypeModel;

const getData = async (req, res) => {
  try {
    const results = await Experience.findAll({
      order: [["start_date", "DESC"]],
      attributes: {
        exclude: [
          "created_at",
          "created_by",
          "updated_at",
          "updated_by",
          "job_type_id",
        ],
      },
      include: [
        {
          model: JobType,
          required: true,
        },
      ],
    });

    if (results.length) {
      const resultsData = results.map(({ dataValues }) => {
        const job_type = dataValues.job_type.name;

        return {
          ...dataValues,
          job_type,
        };
      });

      response("Experience data", 200, resultsData, res);
    } else {
      response("Experience data not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const createData = async (req, res) => {
  const params = req.body;
  const id = generateId("experience", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const createdBy = res.locals.tokenPayload.username;

  const payload = {
    id,
    company: params.company,
    job_title: params.job_title,
    start_date: moment(params.start_date, "DD-MM-YYYY")
      .format("YYYY-MM-DD")
      .toString(),
    end_date: params.end_date
      ? moment(params.end_date, "DD-MM-YYYY").format("YYYY-MM-DD").toString()
      : null,
    job_type_id: params.job_type_id,
    created_at: createdAt,
    created_by: createdBy,
    updated_at: createdAt,
    updated_by: createdBy,
    present: params.present,
    description: params.description,
  };

  try {
    const results = await Experience.create(payload);

    if (results) {
      response("Create experience success", 201, results, res);
    } else {
      response("Create experience failed", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const updateData = async (req, res) => {
  const { id } = req.query;
  const params = req.body;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss").toString();
  const updatedBy = res.locals.tokenPayload.username;

  const payload = {
    company: params.company,
    job_title: params.job_title,
    start_date: moment(params.start_date, "DD-MM-YYYY")
      .format("YYYY-MM-DD")
      .toString(),
    end_date: params.end_date
      ? moment(params.end_date, "DD-MM-YYYY").format("YYYY-MM-DD").toString()
      : null,
    job_type_id: params.job_type_id,
    updated_at: updatedAt,
    updated_by: updatedBy,
    present: params.present,
    description: params.description,
  };

  try {
    const results = await Experience.update(payload, {
      where: { id },
      returning: true,
      plain: true,
    });

    results.splice(results.indexOf(undefined), 1);

    if (results.length) {
      response("Update experience success", 200, results, res);
    } else {
      response("Update experience failed", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  createData,
  updateData,
};
