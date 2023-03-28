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

const getData = (req, res) => {
  User.findAll({
    include: [
      {
        model: Role,
        required: true,
      },
    ],
    attributes: {
      exclude: ["password", "role_id"],
    },
  })
    .then((results) => {
      if (results.length) {
        response("User data", 200, results, res);
      } else {
        response("User not found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

const login = (req, res) => {
  const { usernameEmail, password } = res.locals.params;

  User.findOne({
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
  }).then((results) => {
    if (results) {
      if (!results.dataValues.is_deleted) {
        const token = generateJwt(results.dataValues);
        delete results.dataValues.username;
        delete results.dataValues.email;
        response("Login success", 200, { results, token }, res);
      } else {
        response("Your account is currently inactive", 400, null, res);
      }
    } else {
      response("Incorrect username or password", 404, null, res);
    }
  });
};

const changePassword = (req, res) => {
  const { newPassword } = res.locals.params;
  const { id, username, email } = res.locals.tokenPayload;

  const payload = {
    password: hashPassword(newPassword),
    updated_at: moment().format("YYYY-MM-DD HH:mm:ss").toString(),
    updated_by: username,
  };

  User.update(payload, { where: { id }, returning: true, plain: true })
    .then((results) => {
      results.splice(results.indexOf(undefined), 1);
      if (results.length) {
        response(
          "Reset password success",
          201,
          {
            id,
            username,
            email,
            password: newPassword,
          },
          res
        );
      } else {
        response("Failed to change password", 400, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  getData,
  login,
  changePassword,
};
