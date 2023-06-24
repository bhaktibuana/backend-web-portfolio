import { Request as Req, Response as Res } from "express";
import { jobTypeService } from "../../services";
import { response, serverErrorResponse, generateId } from "../../utils";
import { CreateDataJobTypePayloadType } from "./interfaces";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await jobTypeService.selectData();

    if (result.length) {
      response("Job type data", 200, res, result);
    } else {
      response("Job type not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const createData = async (req: Req, res: Res): Promise<void> => {
  const params = req.body;
  const id = generateId("job type", res.locals.incrementId);

  const payload: CreateDataJobTypePayloadType = {
    id,
    name: params.name,
  };

  try {
    const result = await jobTypeService.insertData(payload);

    if (result) {
      response("Create job type success", 201, res, result);
    } else {
      response("Create job type failed", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const jobTypeController = {
  getData,
  createData,
};
