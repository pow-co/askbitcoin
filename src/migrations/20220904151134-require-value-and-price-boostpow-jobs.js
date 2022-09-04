'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('boostpow_jobs', 'value', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.changeColumn('boostpow_jobs', 'price', {
      type: Sequelize.DECIMAL,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('boostpow_jobs', 'value', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('boostpow_jobs', 'price', {
      type: Sequelize.DECIMAL,
      allowNull: true
    });
  }
};
