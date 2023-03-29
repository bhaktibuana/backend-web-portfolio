const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../../../../configs");

const Skills = sequelize.define(
  "skills",
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
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = {
  Skills,
  sequelize,
  Op,
};
