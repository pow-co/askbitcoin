'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.addColumn('boostpow_jobs', 'proof_tx_id', {
       type: Sequelize.STRING,
       allowNull: true
     });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('boostpow_jobs', 'proof_tx_id');
  }
};
