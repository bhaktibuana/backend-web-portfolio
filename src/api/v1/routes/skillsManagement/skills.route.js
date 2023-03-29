const router = require("express").Router();
const { skillsController } = require("../../controllers");
const { authMiddleware, skillsMiddleware } = require("../../middlewares");

router.get("/", skillsController.getData);

router.post(
  "/",
  authMiddleware.isAuth,
  skillsMiddleware.checkIdIncrement,
  skillsController.createData
);

module.exports = router;
