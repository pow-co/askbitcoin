'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

     const questions_addColumn = `ALTER TABLE "questions" ADD COLUMN questions_content_vector TSVECTOR`
     const questions_createIndex = `CREATE INDEX question_search_idx ON "questions" USING gin("questions_content_vector")`
     const questions_createTrigger = `CREATE TRIGGER questions_vector_update BEFORE INSERT OR UPDATE ON "questions" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("questions_content_vector", 'pg_catalog.english', 'content')`

    await queryInterface.sequelize.query(questions_addColumn)
    await queryInterface.sequelize.query(questions_createIndex)
    await queryInterface.sequelize.query(questions_createTrigger)

     const answers_addColumn = `ALTER TABLE "answers" ADD COLUMN answers_content_vector TSVECTOR`
     const answers_createIndex = `CREATE INDEX answer_search_idx ON "answers" USING gin("answers_content_vector")`
     const answers_createTrigger = `CREATE TRIGGER answers_vector_update BEFORE INSERT OR UPDATE ON "answers" FOR EACH ROW EXECUTE PROCEDURE tsvector_update_trigger("answers_content_vector", 'pg_catalog.english', 'content')`

    await queryInterface.sequelize.query(answers_addColumn)
    await queryInterface.sequelize.query(answers_createIndex)
    await queryInterface.sequelize.query(answers_createTrigger)

  },

  async down (queryInterface, Sequelize) {

    const questions_dropTrigger = `DROP TRIGGER IF EXISTS questions_vector_update`
    const questions_dropIndex = `DROP INDEX IF EXISTS question_search_idx`
    const questions_dropColumn = `alter table "questions" DROP COLUMN questions_content_vector`

    await queryInterface.sequelize.query(questions_dropTrigger)
    await queryInterface.sequelize.query(questions_dropIndex)
    await queryInterface.sequelize.query(questions_dropColumn)

    const answers_dropTrigger = `DROP TRIGGER IF EXISTS answers_vector_update`
    const answers_dropIndex = `DROP INDEX IF EXISTS answer_search_idx`
    const answers_dropColumn = `alter table "answers" DROP COLUMN answers_content_vector`

    await queryInterface.sequelize.query(answers_dropTrigger)
    await queryInterface.sequelize.query(answers_dropIndex)
    await queryInterface.sequelize.query(answers_dropColumn)

  }
};
