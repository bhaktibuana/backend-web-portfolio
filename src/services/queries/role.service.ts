import { Model } from "sequelize";
import { models } from "../../models";

const { Role } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await Role.findAll();
  return result;
};

export const roleService = {
  selectData,
};
