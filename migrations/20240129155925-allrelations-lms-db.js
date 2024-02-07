'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
    //educators id in course table
    await queryInterface.addColumn('Courses', 'eduId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    });

    //courseId in Chapters table
    await queryInterface.addColumn('Chapters', 'courseId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Courses',
        key: 'id',
      },
    });

    //chapterId in pages table
    await queryInterface.addColumn('Pages', 'chapterId', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Chapters',
        key: 'id',
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
    await queryInterface.removeColumn('Courses', 'eduId');

    await queryInterface.removeColumn('Pages', 'chapterId');

    await queryInterface.removeColumn('Chapters', 'courseId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
