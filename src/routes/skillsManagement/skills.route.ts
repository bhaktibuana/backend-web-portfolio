import { Router } from "express";
import { isAuth, isAdmin, skillsMiddleware } from "../../middlewares";
import { skillsController } from "../../controllers";

const router = Router();

router.get("/", skillsController.getData);
router.post("/uploadImage", isAuth, isAdmin, skillsController.uploadImage);
router.post(
  "/",
  isAuth,
  isAdmin,
  skillsMiddleware.getLatesId,
  skillsMiddleware.checkImageRatio,
  skillsController.createData
);

export default router;
