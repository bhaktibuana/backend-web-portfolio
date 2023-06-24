import { Request as Req, Response as Res, NextFunction as NF } from "express";
import * as yup from "yup";
import { LoginDataIface, ChangePassDataIface } from "./interfaces";
import { response } from "../../utils";

const login = async (req: Req, res: Res, next: NF): Promise<void> => {
  const { usernameEmail, password }: LoginDataIface = req.body;

  const data: LoginDataIface = {
    usernameEmail,
    password,
  };

  const schema = yup.object().shape({
    usernameEmail: yup.string().max(100).required(),
    password: yup.string().required(),
  });

  try {
    await schema.validate(data, { abortEarly: false });
    next();
  } catch (error: any) {
    response("Invalid login data", 400, res, error.errors);
  }
};

const changePassword = async (req: Req, res: Res, next: NF): Promise<void> => {
  const { oldPassword, newPassword, newPasswordConf } = req.body;
  const data: ChangePassDataIface = {
    oldPassword,
    newPassword,
    newPasswordConf,
  };

  const schema = yup.object().shape({
    oldPassword: yup.string().required(),
    newPassword: yup
      .string()
      .min(8)
      .notOneOf([yup.ref("oldPassword"), null], "can't use old password as new")
      .required(),
    newPasswordConf: yup
      .string()
      .min(8)
      .oneOf([yup.ref("newPassword")], "new password doesn't match")
      .required(),
  });

  try {
    await schema.validate(data, { abortEarly: false });
    next();
  } catch (error: any) {
    response("Invalid change password data", 400, res, error.errors);
  }
};

export const userValidation = {
  login,
  changePassword,
};
