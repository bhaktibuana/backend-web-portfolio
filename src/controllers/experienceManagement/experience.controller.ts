import { Request as Req, Response as Res } from "express";
import moment from "moment";
import { experienceService } from "../../services";
import { response, serverErrorResponse, generateId } from "../../utils";
import {
  CreateDataExperiencePayloadType,
  UpdateDataPayloadExperienceIface,
} from "./interfaces";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await experienceService.selectData();

    if (result.length) {
      response("Experience data", 200, res, result);
    } else {
      response("Experience not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const createData = async (req: Req, res: Res): Promise<void> => {
  const params = req.body;
  const id = generateId("experience", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const createdBy = res.locals.tokenPayload.username;

  const payload: CreateDataExperiencePayloadType = {
    id,
    company: params.company,
    jobTitle: params.jobTitle,
    description: params.description,
    jobTypeId: params.jobTypeId,
    startDate: moment(params.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    endDate: params.endDate
      ? moment(params.endDate, "DD-MM-YYYY").format("YYYY-MM-DD")
      : null,
    createdAt,
    createdBy,
    updatedAt: createdAt,
    updatedBy: createdBy,
    isDeleted: false,
    isPresent: params.isPresent,
  };

  try {
    const result = await experienceService.insertData(payload);

    if (result) {
      response("Create experience data success", 201, res, result);
    } else {
      response("Create experience data failed", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const updateData = async (req: Req, res: Res): Promise<void> => {
  const id: string = req.query.id as string;
  const params = req.body;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const updatedBy = res.locals.tokenPayload.username;

  const payload: UpdateDataPayloadExperienceIface = {
    company: params.company,
    jobTitle: params.jobTitle,
    description: params.description,
    jobTypeId: params.jobTypeId,
    startDate: moment(params.startDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
    endDate: params.endDate
      ? moment(params.endDate, "DD-MM-YYYY").format("YYYY-MM-DD")
      : null,
    updatedAt,
    updatedBy,
    isPresent: params.isPresent,
  };

  try {
    const result = await experienceService.updateDataById(id, payload);

    if (result) {
      response("Create experience data success", 201, res, result);
    } else {
      response("Create experience data failed", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const experienceController = {
  getData,
  createData,
  updateData,
};
