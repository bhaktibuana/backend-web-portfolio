import { Optional } from "sequelize";

interface CreateDataPayloadIface {
  id: string;
  filePath: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  isDeleted: boolean;
  inactive: boolean;
}

export type CreateDataPayloadType = Optional<CreateDataPayloadIface, "id">;
