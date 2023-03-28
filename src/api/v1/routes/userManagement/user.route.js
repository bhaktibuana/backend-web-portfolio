const express = require("express");
const { userController } = require("../../controllers");
const { userValidation } = require("../../validations");
const { authMiddleware, userMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/", userController.getData);

router.post("/login", userValidation.loginValidation, userController.login);

router.put(
  "/changePassword",
  authMiddleware.isAuth,
  userValidation.changePasswordValidation,
  userMiddleware.checkOldPassword,
  userController.changePassword
);

module.exports = router;
