'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('boostpow_jobs', 'script', { type: Sequelize.TEXT });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('boostpow_jobs', 'script')
  }
};
