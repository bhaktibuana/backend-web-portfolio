import { Request as Req, Response as Res } from "express";
import moment from "moment";
import { userService } from "../../services";
import {
  response,
  serverErrorResponse,
  hashPassword,
  generateJwt,
} from "../../utils";
import { LoginPayloadIface, ChangePassPayloadIface } from "./interfaces";

const getData = async (req: Req, res: Res): Promise<void> => {
  try {
    const result = await userService.selectData();
    if (result.length) {
      response("User data", 200, res, result);
    } else {
      response("User data not found", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const getSelfData = async (req: Req, res: Res): Promise<void> => {
  try {
    const payload = await res.locals.tokenPayload;
    response("User data", 200, res, payload);
  } catch (error) {
    serverErrorResponse(error, res);
  }
};

const login = async (req: Req, res: Res): Promise<void> => {
  const { usernameEmail, password }: LoginPayloadIface = req.body;

  const payload: LoginPayloadIface = {
    usernameEmail,
    password: hashPassword(password),
  };

  try {
    const result = await userService.selectDataForLogin(payload);

    if (result) {
      if (!result.dataValues.isDeleted) {
        const token = generateJwt(result.dataValues);
        delete result.dataValues.username;
        delete result.dataValues.email;
        response("Login success", 200, res, { userResult: result, token });
      } else {
        response("Your account is currently inactive", 400, res);
      }
    } else {
      response("Wrong username or password", 404, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

const changePassword = async (req: Req, res: Res): Promise<void> => {
  const { newPassword } = req.body;
  const { id, username, email } = res.locals.tokenPayload;
  const updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
  const updatedBy = username;

  const payload: ChangePassPayloadIface = {
    password: hashPassword(newPassword),
    updatedAt,
    updatedBy,
  };

  try {
    const result = await userService.updateDataById(id, payload);
    if (result > 0) {
      response("Change password success", 200, res, { id, username, email });
    } else {
      response("Failed to change password", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
  res.end();
};

export const userController = {
  getData,
  getSelfData,
  login,
  changePassword,
};
