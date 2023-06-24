import { Router } from "express";
import { isAuth, isAdmin, experienceMiddleware } from "../../middlewares";
import { experienceController } from "../../controllers";

const router = Router();

router.get("/", experienceController.getData);
router.post(
  "/",
  isAuth,
  isAdmin,
  experienceMiddleware.getLatesId,
  experienceController.createData
);
router.put("/", isAuth, isAdmin, experienceController.updateData);

export default router;
