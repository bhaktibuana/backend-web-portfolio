import { Request as Req, Response as Res } from "express";
import moment from "moment";
import { aboutService } from "../../services";
import { response, serverErrorResponse } from "../../utils";
import { UpdateDescPayloadIface } from "./interfaces";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await aboutService.selectData();

    if (result.length) {
      response("About data", 200, res, result);
    } else {
      response("About data not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const updateDescription = async (req: Req, res: Res): Promise<void> => {
  const { description } = req.body;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const updatedBy = res.locals.tokenPayload.username;

  const payload: UpdateDescPayloadIface = {
    description,
    updatedAt,
    updatedBy,
  };

  try {
    const result = await aboutService.updateDesc(payload);

    if (result[0] > 0) {
      response("Update about description success", 200, res, {
        affectedCount: result,
      });
    } else {
      response("Failed to update about description", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const aboutController = {
  getData,
  updateDescription,
};
