'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('boostpow_proofs', 'difficulty', { type: Sequelize.DECIMAL });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('boostpow_proofs', 'difficulty', { type: Sequelize.NUMBER });
  }
};
