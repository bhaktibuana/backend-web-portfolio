import { Request as Req, Response as Res } from "express";
import moment from "moment";
import { skillsService, imageUploader } from "../../services";
import { response, serverErrorResponse, generateId } from "../../utils";
import { CreateDataPayloadSkillsType } from "./interfaces";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await skillsService.selectData();

    if (result.length) {
      const resultData = result.map(({ dataValues }) => {
        const filePath = `${req.protocol}://${req.get("host")}${
          dataValues.filePath
        }`;

        return {
          ...dataValues,
          filePath,
        };
      });

      response("Skills data", 200, res, resultData);
    } else {
      response("Skills not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const uploadImage = async (req: Req, res: Res): Promise<void> => {
  const { payload, upload } = await imageUploader("skills");
  upload(req, res, (error) => {
    if (!error) {
      response("Upload image success", 201, res, payload);
    } else {
      response("Failed to upload image", 400, res, {
        // @ts-ignore
        fileValidationError: req.fileValidationError,
      });
    }
  });
};

const createData = async (req: Req, res: Res): Promise<void> => {
  const params = req.body;
  const id = generateId("skills", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const createdBy = res.locals.tokenPayload.username;

  const payload: CreateDataPayloadSkillsType = {
    id,
    title: params.title,
    filePath: params.filePath,
    sourceLink: params.sourceLink,
    order: params.order,
    createdAt: createdAt,
    createdBy: createdBy,
    updatedAt: createdAt,
    updatedBy: createdBy,
    isDeleted: false,
  };

  try {
    const result = await skillsService.insertData(payload);

    if (result) {
      response("Create skills data success", 201, res, result);
    } else {
      response("Create skills data failed", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const skillsController = {
  getData,
  uploadImage,
  createData,
};
