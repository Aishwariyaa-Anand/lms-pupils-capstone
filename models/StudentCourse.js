"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize) => {
  class studentcourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      studentcourse.belongsTo(models.User, {
        foreignKey: "studentId",
      });
      studentcourse.belongsTo(models.Course, {
        foreignKey: "courseId",
      });
    }
  }
  studentcourse.init(
    {},
    {
      sequelize,
      modelName: "studentcourse",
    },
  );
  return studentcourse;
};
