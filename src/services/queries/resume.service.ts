import { Model, Optional } from "sequelize";
import { models } from "../../models";
import {
  SelectLatesIdResumeIface,
  InsertDataPayloadResumeIface,
} from "./interfaces";

const { Resume } = models;

const selectActiveData = async (): Promise<Model | null> => {
  const result = await Resume.findOne({
    where: { inactive: false, isDeleted: false },
    attributes: ["id", "filePath"],
  });
  return result;
};

const selectLatesId = async (): Promise<SelectLatesIdResumeIface[]> => {
  const result = await Resume.findAll({
    order: [["id", "DESC"]],
    attributes: ["id"],
    limit: 1,
  });
  const resultData: SelectLatesIdResumeIface[] = result.map(
    ({ dataValues }) => ({
      ...dataValues,
    })
  );
  return resultData;
};

const updateAllDataInactive = async (): Promise<[affectedCount: number]> => {
  const result = await Resume.update(
    { inactive: true },
    { where: { inactive: false } }
  );
  return result;
};

const insertData = async (
  payload: Optional<InsertDataPayloadResumeIface, "id">
): Promise<Model> => {
  const result = await Resume.create(payload);
  return result;
};

export const resumeService = {
  selectActiveData,
  selectLatesId,
  updateAllDataInactive,
  insertData,
};
