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
      Course.belongsTo(models.User, {
        foreignKey: 'eduId'
      });
      Course.hasMany(models.Chapter, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE'
      });
      Course.hasMany(models.studentcourse, {
        foreignKey: 'courseId',
        onDelete: 'CASCADE'
      })
    }
    
    static eduName(){
      return this.sequelize.models.User.findOne({
        attributes: ['name'],
        where: {
          eduId: this.eduId,
        },
      });
    }

    static nname(){
      return this.name;
    }

    static isenrolled(id) {
      return this.update({ enrolled: true }, { where: { id: id } });
    }

  }
  Course.init({
    name: DataTypes.STRING,
    enrolled: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};