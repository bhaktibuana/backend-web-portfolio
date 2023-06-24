import { Request as Req, Response as Res } from "express";
import { roleService } from "../../services";
import { response, serverErrorResponse } from "../../utils";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await roleService.selectData();
    if (result.length) {
      response("Role data", 200, res, result);
    } else {
      response("Role data not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const roleController = {
  getData,
};
