import { Model, ModelCtor, Op, Sequelize } from "sequelize";

interface SequelizeModelIface {
  [prop: string]: ModelCtor<Model>;
}

export type ModelIface = SequelizeModelIface & {
  Op: typeof Op;
  sequelize: Sequelize;
};
