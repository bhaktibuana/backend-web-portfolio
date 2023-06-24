import { Router } from "express";
import { isAuth, isAdmin } from "../../middlewares";
import { aboutController } from "../../controllers";

const router = Router();

router.get("/", aboutController.getData);
router.put("/description", isAuth, isAdmin, aboutController.updateDescription);

export default router;
