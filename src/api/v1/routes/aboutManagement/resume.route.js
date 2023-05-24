const router = require("express").Router();
const { resumeController } = require("../../controllers");
const { authMiddleware, resumeMiddleware } = require("../../middlewares");

router.get("/", resumeController.getData);

router.post(
  "/uploadFile",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  resumeController.uploadFile
);

router.post(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  resumeMiddleware.checkIdIncrement,
  resumeMiddleware.checkFileType,
  resumeMiddleware.setAllDataInactive,
  resumeController.createData
);

module.exports = router;
