const express = require("express");
const { skillsController } = require("../../controllers");
const { authMiddleware, skillsMiddleware } = require("../../middlewares");

const router = express.Router();

router.get("/", skillsController.getData);

router.post("/", authMiddleware.isAuth, skillsMiddleware.checkIdIncrement, skillsController.createData);

module.exports = router;
