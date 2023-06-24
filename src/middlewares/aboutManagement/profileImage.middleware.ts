import { Request as Req, Response as Res, NextFunction as NF } from "express";
import { profileImageService } from "../../services";
import { serverErrorResponse, response, removeFile } from "../../utils";
import path from "path";
import { imageSize } from "image-size";

const getLatesId = async (req: Req, res: Res, next: NF): Promise<void> => {
  try {
    const result = await profileImageService.selectLatesId();

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
  const targetRatio = 3 / 4;

  try {
    const dimension = imageSize(imagePath);
    const imageRatio =
      dimension.width && dimension.height
        ? dimension.width / dimension.height
        : 0;

    if (
      imageRatio <= targetRatio + 0.001 &&
      imageRatio >= targetRatio - 0.001
    ) {
      next();
    } else {
      removeFile(filePath);
      response("Image ratio must be 3 : 4 (potrait)", 400, res);
    }
  } catch (error) {
    removeFile(filePath);
    response("Error while reading image", 500, res);
  }
};

const setAllDataInactive = async (
  req: Req,
  res: Res,
  next: NF
): Promise<void> => {
  try {
    const result = await profileImageService.updateAllDataInactive();

    if (result.length) {
      next();
    } else {
      response("Failed to set inactive data", 400, res);
    }
  } catch (error) {
    serverErrorResponse(error, res);
  }
};

export const profileImageMiddleware = {
  getLatesId,
  checkImageRatio,
  setAllDataInactive,
};
