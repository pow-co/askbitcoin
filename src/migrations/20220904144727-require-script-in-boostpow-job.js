'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.changeColumn('boostpow_jobs', 'script', {
       type: Sequelize.TEXT,
       allowNull: false
     });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.changeColumn('boostpow_jobs', 'script', {
       type: Sequelize.TEXT,
       allowNull: true
     });
  }
};
