'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('boostpow_jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      diff: {
        type: Sequelize.DECIMAL
      },
      category: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      additionalData: {
        type: Sequelize.TEXT
      },
      userNonce: {
        type: Sequelize.STRING
      },
      useGeneralPurposeBits: {
        type: Sequelize.BOOLEAN
      },
      tx_id: {
        type: Sequelize.STRING
      },
      tx_index: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('boostpow_jobs');
  }
};