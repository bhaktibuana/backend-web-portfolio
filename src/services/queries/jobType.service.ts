import { Model, Optional } from "sequelize";
import { models } from "../../models";
import {
  InsertDataPayloadJobTypeIface,
  SelectLatesIdJobTypeIface,
} from "./interfaces";

const { JobType } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await JobType.findAll();
  return result;
};

const selectLatesId = async (): Promise<SelectLatesIdJobTypeIface[]> => {
  const result = await JobType.findAll({
    order: [["id", "DESC"]],
    attributes: ["id"],
    limit: 1,
  });
  const resutlData: SelectLatesIdJobTypeIface[] = result.map(
    ({ dataValues }) => ({
      ...dataValues,
    })
  );
  return resutlData;
};

const insertData = async (
  payload: Optional<InsertDataPayloadJobTypeIface, "id">
): Promise<Model> => {
  const result = await JobType.create(payload);
  return result;
};

export const jobTypeService = {
  selectData,
  selectLatesId,
  insertData,
};
