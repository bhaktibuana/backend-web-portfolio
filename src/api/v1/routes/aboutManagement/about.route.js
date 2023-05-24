const router = require("express").Router();
const { aboutController } = require("../../controllers");
const { authMiddleware } = require("../../middlewares");

router.get("/", aboutController.getData);

router.put(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  aboutController.updateData
);

module.exports = router;
