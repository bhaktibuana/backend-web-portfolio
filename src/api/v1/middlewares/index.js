const authMiddleware = require("./auth.middleware");
const userMiddleware = require("./userManagement/user.middleware");
const skillsMiddleware = require("./skillsManagement/skills.middleware");
const profileImageMiddleware = require("./aboutManagement/profileImage.middleware");
const resumeMiddleware = require("./aboutManagement/resume.middleware");

module.exports = {
  authMiddleware,
  userMiddleware,
  skillsMiddleware,
  profileImageMiddleware,
  resumeMiddleware,
};
