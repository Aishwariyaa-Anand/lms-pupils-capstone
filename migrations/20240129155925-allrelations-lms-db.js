'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    //educators id in course table
    await queryInterface.addColumn('courses', 'eduId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'educators',
        key: 'id',
      },
    });

    //courseId in Chapters table
    await queryInterface.addColumn('chapters', 'courseId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'courses',
        key: 'id',
      },
    });

    //chapterId in pages table
    await queryInterface.addColumn('pages', 'chapterId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'chapters',
        key: 'id',
      },
    });

    //many-to-many relationship btw students and courses
    await queryInterface.createTable('studentcourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      studentId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
      courseId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('pages', 'chapterId');

    await queryInterface.removeColumn('chapters', 'courseId');

    await queryInterface.removeColumn('courses', 'eduId');

    await queryInterface.dropTable('student_course');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
