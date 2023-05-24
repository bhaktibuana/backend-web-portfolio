const router = require("express").Router();
const { experienceController } = require("../../controllers");
const { authMiddleware, experienceMiddleware } = require("../../middlewares");

router.get("/", experienceController.getData);

router.post(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  experienceMiddleware.checkIdIncrement,
  experienceController.createData
);

router.put(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  experienceMiddleware.checkIdExist,
  experienceController.updateData
);

module.exports = router;
