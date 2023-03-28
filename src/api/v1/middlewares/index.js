const authMiddleware = require("./auth.middleware");
const userMiddleware = require("./userManagement/user.middleware");

module.exports = {
  authMiddleware,
  userMiddleware,
};
