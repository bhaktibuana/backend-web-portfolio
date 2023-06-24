import { Request as Req, Response as Res } from "express";
import moment from "moment";
import { resumeService, applicationUploader } from "../../services";
import { serverErrorResponse, response, generateId } from "../../utils";
import { CreateResumePayloadType } from "./interfaces";

const getActiveData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await resumeService.selectActiveData();

    if (result) {
      const filePath = `${req.protocol}://${req.get("host")}${
        result.dataValues.filePath
      }`;
      const resultData = {
        ...result.dataValues,
        filePath,
      };
      response("Resume data", 200, res, resultData);
    } else {
      response("Resume data not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const uploadFile = async (req: Req, res: Res): Promise<void> => {
  const { payload, upload } = await applicationUploader("resume");
  upload(req, res, (error) => {
    if (!error) {
      response("Upload file success", 201, res, payload);
    } else {
      response("Failed to upload file", 400, res, {
        // @ts-ignore
        fileValidationError: req.fileValidationError,
      });
    }
  });
};

const createData = async (req: Req, res: Res): Promise<void> => {
  const params = req.body;
  const id = generateId("resume", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const createdBy = res.locals.tokenPayload.username;

  const payload: CreateResumePayloadType = {
    id,
    filePath: params.filePath,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: createdAt,
    updatedBy: createdBy,
    isDeleted: false,
    inactive: false,
  };

  try {
    const result = await resumeService.insertData(payload);

    if (result) {
      response("Create resume success", 201, res, result)
    } else {
      response("Create resume failed", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const resumeController = {
  getActiveData,
  uploadFile,
  createData,
};
