const router = require("express").Router();
const { roleController } = require("../../controllers");

router.get("/", roleController.getData);

module.exports = router;
