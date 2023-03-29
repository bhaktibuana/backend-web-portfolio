const moment = require("moment");
const { userModel, roleModel } = require("../../models");
const {
  connectionError,
  response,
  generateJwt,
  hashPassword,
} = require("../../utils");

const { User, Op } = userModel;
const { Role } = roleModel;

const getData = async (req, res) => {
  try {
    const userResult = await User.findAll({
      include: [
        {
          model: Role,
          required: true,
        },
      ],
      attributes: {
        exclude: ["password", "role_id"],
      },
    });

    if (userResult.length) {
      response("User data", 200, userResult, res);
    } else {
      response("User not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const getSelfData = async (req, res) => {
  try {
    const payload = await res.locals.tokenPayload;
    response("User data", 200, payload, res);
  } catch (error) {
    connectionError(error, res);
  }
};

const login = async (req, res) => {
  const { usernameEmail, password } = res.locals.params;

  try {
    const userResult = await User.findOne({
      where: {
        [Op.or]: [{ username: usernameEmail }, { email: usernameEmail }],
        password: hashPassword(password),
      },
      include: [
        {
          model: Role,
          required: true,
        },
      ],
      attributes: {
        exclude: [
          "password",
          "created_at",
          "created_by",
          "updated_at",
          "updated_by",
          "role_id",
        ],
      },
    });

    if (userResult) {
      if (!userResult.dataValues.is_deleted) {
        const token = generateJwt(userResult.dataValues);
        delete userResult.dataValues.username;
        delete userResult.dataValues.email;
        response("Login success", 200, { userResult, token }, res);
      } else {
        response("Your account is currently inactive", 400, null, res);
      }
    } else {
      response("Incorrect username or password", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

const changePassword = async (req, res) => {
  const { newPassword } = res.locals.params;
  const { id, username, email } = res.locals.tokenPayload;

  const payload = {
    password: hashPassword(newPassword),
    updated_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    updated_by: username,
  };

  try {
    const userResult = await User.update(payload, {
      where: { id },
      returning: true,
      plain: true,
    });

    userResult.splice(userResult.indexOf(undefined), 1);

    if (userResult.length) {
      response(
        "Reset password success",
        201,
        {
          id,
          username,
          email,
        },
        res
      );
    } else {
      response("Failed to change password", 400, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
  getSelfData,
  login,
  changePassword,
};
