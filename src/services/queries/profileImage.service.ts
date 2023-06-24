import { Model, Optional } from "sequelize";
import { models } from "../../models";
import {
  InsertDataPayloadProfileImageIface,
  SelectLatesIdProfileImageIface,
} from "./interfaces";

const { ProfileImage } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await ProfileImage.findAll({
    where: { isDeleted: false },
  });
  return result;
};

const selectActiveData = async (): Promise<Model | null> => {
  const result = await ProfileImage.findOne({
    where: { inactive: false, isDeleted: false },
    attributes: ["id", "filePath"],
  });
  return result;
};

const selectLatesId = async (): Promise<SelectLatesIdProfileImageIface[]> => {
  const result = await ProfileImage.findAll({
    order: [["id", "DESC"]],
    attributes: ["id"],
    limit: 1,
  });
  const resutlData: SelectLatesIdProfileImageIface[] = result.map(
    ({ dataValues }) => ({
      ...dataValues,
    })
  );
  return resutlData;
};

const insertData = async (
  payload: Optional<InsertDataPayloadProfileImageIface, "id">
): Promise<Model> => {
  const result = await ProfileImage.create(payload);
  return result;
};

const updateAllDataInactive = async (): Promise<[affectedCount: number]> => {
  const result = await ProfileImage.update(
    { inactive: true },
    { where: { inactive: false } }
  );
  return result;
};

export const profileImageService = {
  selectData,
  selectActiveData,
  selectLatesId,
  insertData,
  updateAllDataInactive,
};
