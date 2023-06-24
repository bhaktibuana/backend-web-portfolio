import { Model, Optional } from "sequelize";
import { models } from "../../models";
import {
  InsertDataPayloadSkillsIface,
  SelectLatesIdSkillsIface,
} from "./interfaces";

const { Skills } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await Skills.findAll({ order: [["order", "ASC"]] });
  return result;
};

const selectLatesId = async (): Promise<SelectLatesIdSkillsIface[]> => {
  const result = await Skills.findAll({
    order: [["id", "DESC"]],
    attributes: ["id"],
    limit: 1,
  });
  const resutlData: SelectLatesIdSkillsIface[] = result.map(
    ({ dataValues }) => ({
      ...dataValues,
    })
  );
  return resutlData;
};

const insertData = async (
  payload: Optional<InsertDataPayloadSkillsIface, "id">
): Promise<Model> => {
  const result = await Skills.create(payload);
  return result;
};

export const skillsService = {
  selectData,
  selectLatesId,
  insertData,
};
