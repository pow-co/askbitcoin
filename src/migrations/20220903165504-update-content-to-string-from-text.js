'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('answers', 'content', {
      type: Sequelize.STRING,
      allowNull: false
    })
    await queryInterface.changeColumn('questions', 'content', {
      type: Sequelize.STRING,
      allowNull: false
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('answers', 'content', {
      type: Sequelize.TEXT,
      allowNull: false
    })
    await queryInterface.changeColumn('questions', 'content', {
      type: Sequelize.TEXT,
      allowNull: false
    })
  }
};
