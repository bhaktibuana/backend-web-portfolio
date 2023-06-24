import { Request as Req, Response as Res } from "express";
import moment from "moment";
import { profileImageService, imageUploader } from "../../services";
import { generateId, response, serverErrorResponse } from "../../utils";
import { CreateDataPayloadType } from "./interfaces";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await profileImageService.selectData();

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
      response("Profile image data", 200, res, resultData);
    } else {
      response("Profile image data not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const getActiveData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await profileImageService.selectActiveData();

    if (result) {
      const filePath = `${req.protocol}://${req.get("host")}${
        result.dataValues.filePath
      }`;
      const resultData = {
        ...result.dataValues,
        filePath,
      };
      response("Profile image data", 200, res, resultData);
    } else {
      response("Profile image data not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const uploadImage = async (req: Req, res: Res): Promise<void> => {
  const { payload, upload } = await imageUploader("profile");
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
  const id = generateId("profile image", res.locals.incrementId);
  const createdAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const createdBy = res.locals.tokenPayload.username;

  const payload: CreateDataPayloadType = {
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
    const result = await profileImageService.insertData(payload);

    if (result) {
      response("Create profile image success", 201, res, result);
    } else {
      response("Create profile image failed", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const profileImageController = {
  getData,
  getActiveData,
  uploadImage,
  createData,
};
