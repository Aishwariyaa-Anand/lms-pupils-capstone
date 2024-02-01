'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Educator, {
        foreignKey: 'eduId'
      });
      Course.hasMany(models.Chapter, {
        foreignKey: 'courseId'
      });
      Course.hasMany(models.studentcourse, {
        foreignKey: 'courseId'
      })
    }
    
    static eduName(){
      return this.sequelize.models.Educator.findOne({
        attributes: ['name'],
        where: {
          eduId: this.eduId,
        },
      });
    }

    static nname(){
      return this.name;
    }
  }
  Course.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};