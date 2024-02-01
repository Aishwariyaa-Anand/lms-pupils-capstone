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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
