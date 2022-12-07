import { Model, DataTypes } from 'sequelize';

import events from '../events'

import { getChannel } from 'rabbi'

export class Answer extends Model {
  id: number;
  content: string;
  tx_id: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here

    models.Answer.belongsTo(models.Question, {
      foreignKey: "question_tx_id",
      targetKey: "tx_id",
      as: "question"
    })

    models.Answer.hasMany(models.BoostpowJob, {
      foreignKey: "content",
      sourceKey: "tx_id",
      as: "boostpow_jobs"
    })

    models.Answer.hasMany(models.BoostpowProof, {
      foreignKey: "content_tx_id",
      sourceKey: "tx_id",
      as: "boostpow_proofs"
    })

  }

  static getSearchVector() {
    return 'answers_content_vector'
  }

  static async search(query) {

    const result = await this.sequelize
      .query(`SELECT * FROM answers WHERE "${this.getSearchVector()}" @@ plainto_tsquery('english', ?)`,   {
        replacements: [query]
      });

    return result[0]
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
    hooks: {
      async afterCreate(answer: any) {
        events.emit('askbitcoin.answer.created', answer)

        const channel = await getChannel()

        const json = JSON.stringify(answer.toJSON())

        channel.publish('askbitcoin', 'askbitcoin.answer.created', Buffer.from(json))
      }
    },
    sequelize,
    modelName: 'Answer',
    tableName: 'answers'
  });

  return Answer;

};
