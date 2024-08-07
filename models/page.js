"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Page.belongsTo(models.Chapter, {
        foreignKey: "chapterId",
      });
      Page.hasMany(models.pagecomp, {
        foreignKey: "pageId",
      });
    }

    markcomplete(complete) {
      return this.update({ completed: complete });
    }
  }
  Page.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Page",
    },
  );
  return Page;
};
