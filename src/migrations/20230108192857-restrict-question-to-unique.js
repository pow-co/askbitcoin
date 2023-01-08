'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.addIndex('answers', ['tx_id', 'tx_index'], {
      name: 'unique_answers',
      unique: true
    })


    await queryInterface.addIndex('questions', ['tx_id', 'tx_index'], {
      name: 'unique_questions',
      unique: true
    })

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeIndex('answers', 'unique_answers')

    await queryInterface.removeIndex('questions', 'unique_questions')

  }

};
