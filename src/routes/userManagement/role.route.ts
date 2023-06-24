import { Router } from "express";
import { isAuth, isAdmin } from "../../middlewares";
import { roleController } from "../../controllers";

const router = Router();

router.get("/", isAuth, isAdmin, roleController.getData);

export default router;
