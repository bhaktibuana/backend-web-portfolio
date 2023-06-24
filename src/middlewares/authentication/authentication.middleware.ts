import { Request as Req, Response as Res, NextFunction as NF } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../configs";
import { response } from "../../utils";

export const isAuth = (req: Req, res: Res, next: NF): void => {
  if (!req.headers.authorization) {
    response("Unauthorized", 401, res);
  } else {
    const splitToken: string[] = (req.headers.authorization as string).split(
      " "
    );

    if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
      response("Wrong authorization format", 400, res);
    } else {
      jwt.verify(
        splitToken[1],
        config.jwtSecretKey,
        { algorithms: ["HS256"] },
        (error, payload) => {
          if (error && error.name === "TokenExpiredError") {
            response("Unauthorized: token expired", 401, res);
          } else if (error) {
            response("Unauthorized: invalid Token", 401, res);
          } else {
            res.locals.tokenPayload = payload;
            next();
          }
        }
      );
    }
  }
};

export const isAdmin = (req: Req, res: Res, next: NF): void => {
  const { Role } = res.locals.tokenPayload;

  if (Role.code === "SA") {
    next();
  } else {
    response("Forbidden: only super admin can access", 403, res);
  }
};
