import { BuildOptions, Model, ModelCtor, ModelOptions } from "sequelize";

export type SequelizeModelIface = ModelCtor<Model> & { associate: (models: any) => void } & {
  new (values?: Record<string, unknown>, options?: BuildOptions): ModelOptions;
};
