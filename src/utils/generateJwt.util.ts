import jwt from "jsonwebtoken";
import { config } from "../configs";

export const generateJwt = (payload: any): string => {
  return jwt.sign(payload, config.jwtSecretKey, {
    expiresIn: config.jwtExpiredTime,
  });
};
