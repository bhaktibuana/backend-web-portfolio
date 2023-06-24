import { Router } from "express";
import { isAuth, isAdmin, resumeMiddleware } from "../../middlewares";
import { resumeController } from "../../controllers";

const router = Router();

router.get("/", resumeController.getActiveData);
router.post("/uploadFile", isAuth, isAdmin, resumeController.uploadFile);
router.post(
  "/",
  isAuth,
  isAdmin,
  resumeMiddleware.getLatesId,
  resumeMiddleware.checkFileType,
  resumeMiddleware.setAllDataInactive,
  resumeController.createData
);

export default router;
