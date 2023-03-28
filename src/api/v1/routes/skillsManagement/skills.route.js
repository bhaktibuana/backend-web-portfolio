const express = require("express");
const { skillsController } = require("../../controllers");

const router = express.Router();

router.get("/", skillsController.getData);

module.exports = router;
