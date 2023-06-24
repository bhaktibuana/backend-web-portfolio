import { Sequelize, DataTypes } from "sequelize";
import { SequelizeModelIface } from "./interfaces/allModel.interface";

export = (sequelize: Sequelize) => {
  const Skills = <SequelizeModelIface>sequelize.define(
    "Skills",
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sourceLink: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      order: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  Skills.associate = (models) => {};

  return Skills;
};
