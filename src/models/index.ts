import fs from "fs";
import path from "path";
import { Op, ModelCtor, Model } from "sequelize";
import { sequelize } from "../configs";
import { ModelIface } from "./interfaces";

const baseName = path.basename(__filename);

const models = (): ModelIface => {
  const models = <ModelIface>{};

  const allModelFiles = fs.readdirSync(__dirname).filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== baseName &&
      (file.slice(-3) === ".js" || file.slice(-3) === ".ts")
    );
  });

  for (let i = 0; i < allModelFiles.length; i++) {
    const model: ModelCtor<Model> = require(path.join(
      __dirname,
      allModelFiles[i]
    ))(sequelize);
    models[model.name] = model;
  }

  Object.keys(models).forEach((modelName: string) => {
    // @ts-ignore
    if (models[modelName].associate) {
      // @ts-ignore
      models[modelName].associate(models);
    }
  });

  models.Op = Op;
  models.sequelize = sequelize;
  return models;
};

const db = models();

export { db as models };
