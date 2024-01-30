'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentCourse.belongsTo(Student, {
        foreignKey: 'studentId'
      });
      StudentCourse.belongsTo(Course, {
        foreignKey: 'courseId'
      })
    }
  }
  StudentCourse.init({
  }, {
    sequelize,
    modelName: 'StudentCourse',
  });
  return StudentCourse;
};