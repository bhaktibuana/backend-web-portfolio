const { roleModel } = require("../../models");
const { connectionError, response } = require("../../utils");

const { Role } = roleModel;

const getData = (req, res) => {
  Role.findAll()
    .then((results) => {
      if (results.length) {
        response("Role data", 200, results, res);
      } else {
        response("Role not found", 404, null, res);
      }
    })
    .catch((error) => connectionError(error, res));
};

module.exports = {
  getData,
};
