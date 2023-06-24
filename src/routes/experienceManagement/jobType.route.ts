import { Router } from "express";
import { isAuth, isAdmin, jobTypeMiddleware } from "../../middlewares";
import { jobTypeController } from "../../controllers";

const router = Router();

router.get("/", jobTypeController.getData);
router.post(
  "/",
  isAuth,
  isAdmin,
  jobTypeMiddleware.getLatesId,
  jobTypeController.createData
);

export default router;
