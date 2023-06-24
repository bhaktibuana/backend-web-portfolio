import { Sequelize } from "sequelize";
import { config } from "./app.config";

const dbConfig = (dbName: string): Sequelize => {
  const dbParams = {
    host: config.dbHost,
    username: config.dbUsername,
    password: config.dbPassword,
    dbName,
  };

  return new Sequelize(dbParams.dbName, dbParams.username, dbParams.password, {
    host: dbParams.host,
    dialect: "mysql",
    port: parseInt(config.dbPort),
    logging: config.nodeEnv === "production" ? false : console.log,
  });
};

export const db = dbConfig(config.dbName);
