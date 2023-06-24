import { Router } from "express";
import { isAuth, isAdmin, profileImageMiddleware } from "../../middlewares";
import { profileImageController } from "../../controllers";

const router = Router();

router.get("/", isAuth, isAdmin, profileImageController.getData);
router.get("/activeData", profileImageController.getActiveData);
router.post(
  "/uploadImage",
  isAuth,
  isAdmin,
  profileImageController.uploadImage
);
router.post(
  "/",
  isAuth,
  isAdmin,
  profileImageMiddleware.getLatesId,
  profileImageMiddleware.checkImageRatio,
  profileImageMiddleware.setAllDataInactive,
  profileImageController.createData
);

export default router;
