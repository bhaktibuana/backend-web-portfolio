const { userModel, roleModel } = require("../../models");
const { connectionError, response } = require("../../utils");

const { User } = userModel;
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

module.exports = {
  getData,
};
