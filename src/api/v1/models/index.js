const roleModel = require("./userManagement/role.model");
const userModel = require("./userManagement/user.model");
const skillsModel = require("./skillsManagement/skills.model");
const profileImageModel = require("./aboutManagement/profileImage.model");
const aboutModel = require("./aboutManagement/about.model");
const resumeModel = require("./aboutManagement/resume.model");

/* ASSOCIATIONS BEGIN */

// user association
userModel.User.belongsTo(roleModel.Role, {
  foreignKey: "role_id",
});

module.exports = {
  roleModel,
  userModel,
  skillsModel,
  profileImageModel,
  aboutModel,
  resumeModel,
};
