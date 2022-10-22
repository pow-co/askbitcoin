'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.addColumn('questions', 'url_stub', { type: Sequelize.TEXT });
  },

  down: async (queryInterface, Sequelize) => {

     await queryInterface.removeColumn('questions', 'url_stub');
  }
};
