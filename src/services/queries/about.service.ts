import { Model } from "sequelize";
import { models } from "../../models";
import { UpdateDescPayloadIface } from "./interfaces";

const { About } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await About.findAll({
    where: { inactive: false, isDeleted: false },
    attributes: ["id", "description"],
  });
  return result;
};

const updateDesc = async (
  payload: UpdateDescPayloadIface
): Promise<[affectedCount: number]> => {
  const result = await About.update(payload, {
    where: { inactive: false, isDeleted: false },
  });
  return result;
};

export const aboutService = {
  selectData,
  updateDesc,
};
