const { roleModel } = require("../../models");
const { connectionError, response } = require("../../utils");

const { Role } = roleModel;

const getData = async (req, res) => {
  try {
    const roleResult = await Role.findAll();

    if (roleResult.length) {
      response("Role data", 200, roleResult, res);
    } else {
      response("Role not found", 404, null, res);
    }
  } catch (error) {
    connectionError(error, res);
  }
};

module.exports = {
  getData,
};
