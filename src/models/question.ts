import { Model, DataTypes } from 'sequelize';

import events from '../events'

import { getChannel } from 'rabbi'

export class Question extends Model {
  id: number;
  content: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here

    models.Question.hasMany(models.Answer, {
      foreignKey: "question_tx_id",
      sourceKey: "tx_id",
      as: "answers"
    })

    models.Question.hasMany(models.BoostpowJob, {
      foreignKey: "content",
      sourceKey: "tx_id",
      as: "boostpow_jobs"
    })

    models.Question.hasMany(models.BoostpowProof, {
      foreignKey: "content_tx_id",
      sourceKey: "tx_id",
      as: "boostpow_proofs"
    })

  }
};

export function init(sequelize) {

  Question.init({
    tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tx_index: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    tx_hex: {
      type: DataTypes.TEXT,
      allowNull: true
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
    hooks: {
      async afterCreate(question: any) {
        events.emit('askbitcoin.question.created', question)

        const channel = await getChannel()

        const json = JSON.stringify(question.toJSON())

        channel.publish('askbitcoin', 'askbitcoin.question.created', Buffer.from(json))
      }
    },
    sequelize,
    modelName: 'Question',
    tableName: 'questions'
  });

  return Question;

};
