const router = require("express").Router();
const { jobTypeController } = require("../../controllers");
const { authMiddleware, jobTypeMiddleware } = require("../../middlewares");

router.get("/", jobTypeController.getData);

router.post(
  "/",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  jobTypeMiddleware.checkIdIncrement,
  jobTypeController.createData
);

module.exports = router;
