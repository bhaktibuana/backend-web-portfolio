import { Request as Req, Response as Res, NextFunction as NF } from "express";
import { userService } from "../../services";
import { hashPassword, serverErrorResponse, response } from "../../utils";
import { VerifyPassPayloadIface } from "./interfaces";

const verifyOldPassword = async (
  req: Req,
  res: Res,
  next: NF
): Promise<void> => {
  const { oldPassword } = req.body;
  const { id } = res.locals.tokenPayload;

  const payload: VerifyPassPayloadIface = {
    id,
    password: hashPassword(oldPassword),
  };

  try {
    const result = await userService.selectDataVerifyPass(payload);

    if (result) {
      next();
    } else {
      response("Wrong old password", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
};

export const userMiddleware = {
  verifyOldPassword,
};
