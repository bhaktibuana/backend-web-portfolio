const express = require("express");
const { roleController } = require("../../controllers");

const router = express.Router();

router.get("/", roleController.getData);

module.exports = router;
