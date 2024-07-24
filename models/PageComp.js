"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class pagecomp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pagecomp.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      pagecomp.belongsTo(models.Page, {
        foreignKey: "pageId",
      });
    }
  }
  pagecomp.init(
    {},
    {
      sequelize,
      modelName: "pagecomp",
    },
  );
  return pagecomp;
};
