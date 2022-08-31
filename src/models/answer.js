'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Answer.init({
    question_tx_id: DataTypes.STRING,
    tx_id: DataTypes.STRING,
    tx_index: DataTypes.NUMBER,
    timestamp: DataTypes.DATE,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answers'
  });
  return Answer;
};