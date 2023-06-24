import { Request as Req, Response as Res, NextFunction as NF } from "express";
import { experienceService } from "../../services";
import { serverErrorResponse, response } from "../../utils";

const getLatesId = async (req: Req, res: Res, next: NF): Promise<void> => {
  try {
    const result = await experienceService.selectLatesId();

    if (result.length) {
      const lastIncrement = parseInt(result[0].id.split("-")[1]);
      res.locals.incrementId = lastIncrement + 1;
      next();
    } else {
      res.locals.incrementId = 1;
      next();
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
};

export const experienceMiddleware = {
  getLatesId,
};
