const express = require("express");
const router = express.Router();

const roleRoute = require("./userManagement/role.route");
router.use("/role", roleRoute);

const userRoute = require("./userManagement/user.route");
router.use("/user", userRoute);

const skillsRoute = require("./skillsManagement/skills.route");
router.use("/skills", skillsRoute);

module.exports = router;
