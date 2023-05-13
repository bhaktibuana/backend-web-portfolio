const router = require("express").Router();
const { profileImageController } = require("../../controllers");
const { authMiddleware, profileImageMiddleware } = require("../../middlewares");

router.get(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  profileImageController.getData
);

router.get("/getActiveData", profileImageController.getActiveData);

router.post(
  "/uploadImage",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  profileImageController.uploadImage
);

router.post(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  profileImageMiddleware.checkIdIncrement,
  profileImageMiddleware.checkImageRatio,
  profileImageMiddleware.setAllDataInactive,
  profileImageController.createData
);

module.exports = router;
