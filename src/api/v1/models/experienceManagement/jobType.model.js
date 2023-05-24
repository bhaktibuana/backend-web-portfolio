const { DataTypes, Op } = require("sequelize");
const { sequelize } = require("../../../../configs");

const JobType = sequelize.define(
  "job_type",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    name: {
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
  JobType,
  sequelize,
  Op,
};
