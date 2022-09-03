
import { Model, DataTypes } from 'sequelize';

import events from '../events'

import { getChannel } from 'rabbi'

export class BoostpowProof extends Model {
  id: number;
  content: string;
  tx_id: string;
  difficulty: number;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {

    models.BoostpowProof.belongsTo(models.Answer, {
      foreignKey: 'content_tx_id',
      targetKey: 'content',
      as: 'answer'
    })

    models.BoostpowProof.belongsTo(models.Question, {
      foreignKey: 'content_tx_id',
      targetKey: 'content',
      as: 'question'
    })

    models.BoostpowProof.belongsTo(models.BoostpowJob, {
      foreignKey: 'job_tx_id',
      targetKey: 'tx_id',
      as: 'job'
    })
  }

};

export function init(sequelize) {

  BoostpowProof.init({
    tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tx_index: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    job_tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job_tx_index: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    difficulty: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    content_tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    hooks: {
      async afterCreate(proof: any) {

        events.emit('askbitcoin.boostpow.proof.created', proof)

        const channel = await getChannel()

        const json = JSON.stringify(proof.toJSON())

        channel.publish('askbitcoin', 'askbitcoin.boostpow.proof.created', Buffer.from(json))
      }
    },
    sequelize,
    modelName: 'BoostpowProof',
    tableName: 'boostpow_proofs'
  });

  return BoostpowProof;

};
