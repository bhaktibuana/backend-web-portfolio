import { Model, Optional } from "sequelize";
import { models } from "../../models";
import {
  InsertDataPayloadExperienceIface,
  SelectLatesIdExperienceIface,
  UpdateDataPayloadExperienceIface,
} from "./interfaces";

const { Experience, JobType } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await Experience.findAll({
    order: [["startDate", "DESC"]],
    attributes: {
      exclude: [
        "createdAt",
        "createdBy",
        "updatedAt",
        "updatedBy",
        "jobTypeId",
      ],
    },
    include: [
      {
        model: JobType,
        required: true,
      },
    ],
  });
  return result;
};

const selectLatesId = async (): Promise<SelectLatesIdExperienceIface[]> => {
  const result = await Experience.findAll({
    order: [["id", "DESC"]],
    attributes: ["id"],
    limit: 1,
  });
  const resutlData: SelectLatesIdExperienceIface[] = result.map(
    ({ dataValues }) => ({
      ...dataValues,
    })
  );
  return resutlData;
};

const insertData = async (
  payload: Optional<InsertDataPayloadExperienceIface, "id">
): Promise<Model> => {
  const result = await Experience.create(payload);
  return result;
};

const updateDataById = async (
  id: string,
  payload: UpdateDataPayloadExperienceIface
): Promise<[affectedCount: number]> => {
  const result = await Experience.update(payload, {
    where: { id },
  });
  return result;
};

export const experienceService = {
  selectData,
  selectLatesId,
  insertData,
  updateDataById,
};
