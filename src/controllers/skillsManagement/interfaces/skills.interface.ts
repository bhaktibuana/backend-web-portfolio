import { Optional } from "sequelize";

interface CreateDataPayloadSkillsIface {
  id: string;
  title: string;
  filePath: string;
  sourceLink: string;
  order: number;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
}

export type CreateDataPayloadSkillsType = Optional<CreateDataPayloadSkillsIface, "id">;
