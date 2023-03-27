const apiConfig = require("./api.config");
const dbConfig = require("./db.config");

module.exports = {
  api: apiConfig,
  sequelize: dbConfig,
};
