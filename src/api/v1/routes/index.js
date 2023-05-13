const router = require("express").Router();

const roleRoute = require("./userManagement/role.route");
router.use("/role", roleRoute);

const userRoute = require("./userManagement/user.route");
router.use("/user", userRoute);

const skillsRoute = require("./skillsManagement/skills.route");
router.use("/skills", skillsRoute);

const profileImageRoute = require("./aboutManagement/profileImage.route");
router.use("/profileImage", profileImageRoute);

const aboutRoute = require("./aboutManagement/about.route");
router.use("/about", aboutRoute);

const resumeRoute = require("./aboutManagement/resume.route");
router.use("/resume", resumeRoute);

module.exports = router;
