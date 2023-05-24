const authMiddleware = require("./auth.middleware");
const userMiddleware = require("./userManagement/user.middleware");
const skillsMiddleware = require("./skillsManagement/skills.middleware");
const profileImageMiddleware = require("./aboutManagement/profileImage.middleware");
const resumeMiddleware = require("./aboutManagement/resume.middleware");
const jobTypeMiddleware = require("./experienceManagement/jobType.middleware");
const experienceMiddleware = require("./experienceManagement/experience.middleware");

module.exports = {
  authMiddleware,
  userMiddleware,
  skillsMiddleware,
  profileImageMiddleware,
  resumeMiddleware,
  jobTypeMiddleware,
  experienceMiddleware,
};
