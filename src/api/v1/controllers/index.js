const roleController = require("./userManagement/role.controller");
const userController = require("./userManagement/user.controller");
const skillsController = require("./skillsManagement/skills.controller");
const profileImageController = require("./aboutManagement/profileImage.controller");
const aboutController = require("./aboutManagement/about.controller");
const resumeController = require("./aboutManagement/resume.controller");
const jobTypeController = require("./experienceManagement/jobType.controller");
const experienceController = require("./experienceManagement/experience.controller");

module.exports = {
  roleController,
  userController,
  skillsController,
  profileImageController,
  aboutController,
  resumeController,
  jobTypeController,
  experienceController,
};
