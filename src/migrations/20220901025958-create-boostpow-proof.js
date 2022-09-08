'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boostpow_proofs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content_tx_id: {
        type: Sequelize.STRING
      },
      tx_id: {
        type: Sequelize.STRING
      },
      job_tx_id: {
        type: Sequelize.STRING
      },
      job_tx_index: {
        type: Sequelize.INTEGER
      },
      tx_index: {
        type: Sequelize.INTEGER
      },
      difficulty: {
        type: Sequelize.DECIMAL
      },
      timestamp: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('boostpow_proofs');
  }
};