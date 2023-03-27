const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../../../../configs");

const Role = sequelize.define(
  "role",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = {
  Role,
  sequelize,
  Op,
};
