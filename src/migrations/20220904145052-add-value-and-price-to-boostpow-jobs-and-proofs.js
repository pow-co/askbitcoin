'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('boostpow_jobs', 'value', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('boostpow_jobs', 'price', {
      type: Sequelize.DECIMAL,
      allowNull: true
    });

    await queryInterface.addColumn('boostpow_proofs', 'value', {
      type: Sequelize.INTEGER,
      allowNull: true
    });

    await queryInterface.addColumn('boostpow_proofs', 'price', {
      type: Sequelize.DECIMAL,
      allowNull: true
    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('boostpow_jobs', 'value')

    await queryInterface.removeColumn('boostpow_jobs', 'price')

    await queryInterface.removeColumn('boostpow_proofs', 'value')

    await queryInterface.removeColumn('boostpow_proofs', 'price')
  }

};
