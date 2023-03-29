const router = require("express").Router();
const { userController } = require("../../controllers");
const { userValidation } = require("../../validations");
const { authMiddleware, userMiddleware } = require("../../middlewares");

router.get("/", userController.getData);

router.get("/selfData", authMiddleware.isAuth, userController.getSelfData);

router.post("/login", userValidation.loginValidation, userController.login);

router.put(
  "/changePassword",
  authMiddleware.isAuth,
  userValidation.changePasswordValidation,
  userMiddleware.checkOldPassword,
  userController.changePassword
);

module.exports = router;
