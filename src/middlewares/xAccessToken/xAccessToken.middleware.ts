import { Request as Req, Response as Res, NextFunction as NF } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../configs";
import { response } from "../../utils";

export const xAccessTokenCheck = (req: Req, res: Res, next: NF): void => {
  if (req.headers["x-access-token"] === undefined) {
    response("Forbidden", 403, res);
  } else {
    const splitToken: string[] = (
      req.headers["x-access-token"] as string
    ).split(" ");

    if (splitToken.length !== 2 || splitToken[0] !== "Bearer") {
      response("Wrong x-access-token format", 400, res);
    } else if (splitToken[1] === config.xAccessTokenTest) {
      next();
    } else {
      jwt.verify(
        splitToken[1],
        config.jwtSecretKey,
        { algorithms: ["HS256"] },
        (error, payload) => {
          if (error && error.name === "TokenExpiredError") {
            response("Forbidden: token expired", 403, res);
          } else if (error) {
            response("Forbidden: invalid token", 403, res);
          } else {
            const tokenPayload =
              typeof payload === "object"
                ? payload["x-access-token"]
                : undefined;

            tokenPayload === config.xAccessToken
              ? next()
              : response("Invalid x-access-token", 403, res);
          }
        }
      );
    }
  }
};
