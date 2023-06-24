import { Request as Req, Response as Res, NextFunction as NF } from "express";
import { resumeService } from "../../services";
import { serverErrorResponse, response, removeFile } from "../../utils";
import path from "path";

const getLatesId = async (req: Req, res: Res, next: NF): Promise<void> => {
  try {
    const result = await resumeService.selectLatesId();

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

const checkFileType = (req: Req, res: Res, next: NF): void => {
  const { filePath } = req.body;
  const appDir = process.cwd();
  const targetFilePath = path.join(`${appDir}/public`, filePath);

  try {
    const fileType = path.extname(targetFilePath);

    if (fileType === ".pdf") {
      next();
    } else {
      removeFile(filePath);
      response("Document must be .pdf", 400, res);
    }
  } catch (error) {
    response("Error while reading file", 500, res);
  }
};

const setAllDataInactive = async (
  req: Req,
  res: Res,
  next: NF
): Promise<void> => {
  try {
    const result = await resumeService.updateAllDataInactive();

    if (result.length) {
      next();
    } else {
      response("Failed to set inactive data", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
};

export const resumeMiddleware = {
  getLatesId,
  checkFileType,
  setAllDataInactive,
};
