import { Optional } from "sequelize";

interface CreateDataJobTypePayloadIface {
  id: string;
  name: string;
}

export type CreateDataJobTypePayloadType = Optional<
  CreateDataJobTypePayloadIface,
  "id"
>;
