'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface, Sequelize) {

    await queryInterface.addIndex('boostpow_proofs', ['content_tx_id'], {
      name: 'boostpow_proofs_content'
    })

    await queryInterface.addIndex('answers', ['question_tx_id'], {
      name: 'boostpow_question_answers'
    })

  },

  async down (queryInterface, Sequelize) {

    await queryInterface.removeIndex('boostpow_proofs', 'boostpow_proofs_content')

    await queryInterface.removeIndex('answers', 'boostpow_question_answers')

  }

};
