import { Router } from "express";
import { isAuth, isAdmin, userMiddleware } from "../../middlewares";
import { userValidation } from "../../validations";
import { userController } from "../../controllers";

const router = Router();

router.get("/", isAuth, isAdmin, userController.getData);
router.get("/selfData", isAuth, userController.getSelfData);
router.post("/login", userValidation.login, userController.login);
router.put(
  "/changePassword",
  isAuth,
  userMiddleware.verifyOldPassword,
  userValidation.changePassword,
  userController.changePassword
);

export default router;
