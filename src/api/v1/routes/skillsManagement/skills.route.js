const router = require("express").Router();
const { skillsController } = require("../../controllers");
const { authMiddleware, skillsMiddleware } = require("../../middlewares");

router.get("/", skillsController.getData);

router.post(
  "/uploadImage",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  skillsController.uploadImage
);

router.post(
  "/",
  authMiddleware.isAuth,
  skillsMiddleware.checkIdIncrement,
  skillsMiddleware.checkImageDimension,
  skillsController.createData
);

module.exports = router;
