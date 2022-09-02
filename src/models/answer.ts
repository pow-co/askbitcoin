import { Model, DataTypes } from 'sequelize';

export class Answer extends Model {
  content: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
};

export function init(sequelize) {

  Answer.init({
    question_tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tx_index: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Answer',
    tableName: 'answers'
  });

  return Answer;

};
