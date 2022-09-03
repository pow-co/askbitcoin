
import { Model, DataTypes } from 'sequelize';

import * as moment from 'moment'

export class BoostpowProof extends Model {
  content: string;
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
    sequelize,
    modelName: 'BoostpowProof',
    tableName: 'boostpow_proofs'
  });

  return BoostpowProof;

};
