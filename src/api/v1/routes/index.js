const express = require("express");
const router = express.Router();

const roleRoute = require("./userManagement/role.route");
router.use("/role", roleRoute);

module.exports = router;
