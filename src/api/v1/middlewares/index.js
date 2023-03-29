const authMiddleware = require("./auth.middleware");
const userMiddleware = require("./userManagement/user.middleware");
const skillsMiddleware = require("./skillsManagement/skills.middleware");

module.exports = {
  authMiddleware,
  userMiddleware,
  skillsMiddleware,
};
