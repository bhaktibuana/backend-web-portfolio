const { userModel } = require("../../models");
const { connectionError, response, hashPassword } = require("../../utils");

const { User } = userModel;

const checkOldPassword = async (req, res, next) => {
  const { oldPassword } = res.locals.params;
  const { id } = res.locals.tokenPayload;

  try {
    const userResult = await User.findOne({
      where: { id, password: hashPassword(oldPassword) },
    });

    if (userResult) {
      next();
    } else {
      response("Wrong old password", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  checkOldPassword,
};
