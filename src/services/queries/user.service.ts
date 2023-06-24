import { Model } from "sequelize";
import { models } from "../../models";
import { LoginPayloadIface, VerifyPassPayloadIface } from "./interfaces";

const { Op, User, Role } = models;

const selectData = async (): Promise<Model[]> => {
  const result = await User.findAll({
    include: [
      {
        model: Role,
        required: true,
      },
    ],
    attributes: {
      exclude: ["password", "roleId"],
    },
  });
  return result;
};

const selectDataForLogin = async (
  payload: LoginPayloadIface
): Promise<Model | null> => {
  const result = await User.findOne({
    where: {
      [Op.or]: [
        { username: payload.usernameEmail },
        { email: payload.usernameEmail },
      ],
      password: payload.password,
    },
    include: [
      {
        model: Role,
        required: true,
      },
    ],
    attributes: {
      exclude: [
        "password",
        "createdAt",
        "createdBy",
        "updatedAt",
        "updatedBy",
        "roleId",
      ],
    },
  });
  return result;
};

const selectDataVerifyPass = async (
  payload: VerifyPassPayloadIface
): Promise<Model | null> => {
  const result = await User.findOne({
    where: {
      id: payload.id,
      password: payload.password,
    },
  });
  return result;
};

const updateDataById = async (id: string, payload: any): Promise<number> => {
  const result = await User.update(payload, {
    where: { id },
  });

  return result[0];
};

export const userService = {
  selectData,
  selectDataForLogin,
  selectDataVerifyPass,
  updateDataById,
};
