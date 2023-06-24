import { Request as Req, Response as Res, NextFunction as NF } from "express";
import { skillsService } from "../../services";
import { serverErrorResponse, response, removeFile } from "../../utils";
import path from "path";
import { imageSize } from "image-size";

const getLatesId = async (req: Req, res: Res, next: NF): Promise<void> => {
  try {
    const result = await skillsService.selectLatesId();

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

const checkImageRatio = (req: Req, res: Res, next: NF): void => {
  const { filePath } = req.body;
  const appDir = process.cwd();
  const imagePath = path.join(`${appDir}/public`, filePath);

  try {
    const dimension = imageSize(imagePath);
    const width = dimension.width as number;
    const height = dimension.height as number;

    if (width <= 90 && height <= 90) {
      next();
    } else {
      removeFile(filePath);
      response("Image dimensions should not exceed 90x90px", 400, res);
    }
  } catch (error) {
    removeFile(filePath);
    response("Error while reading image", 500, res);
  }
};

export const skillsMiddleware = {
  getLatesId,
  checkImageRatio,
};
