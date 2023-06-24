import { Sequelize, DataTypes } from "sequelize";
import { SequelizeModelIface } from "./interfaces/allModel.interface";

export = (sequelize: Sequelize) => {
  const Role = <SequelizeModelIface>sequelize.define(
    "Role",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, {
      foreignKey: "roleId",
    });
  };

  return Role;
};
