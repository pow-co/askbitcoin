
import { Model, DataTypes, DecimalDataType } from 'sequelize';

export class BoostpowJob extends Model {
  content: string;
  diff: DecimalDataType;
  timestamp: Date;
  tx_id: string;
  category: string;
  tag: string;
  additionalData: string;
  userNonce: string;
  useGeneralPurposeBits: boolean;
  proof_tx_id: string;
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here

    models.BoostpowJob.belongsTo(models.Answer, {
      foreignKey: 'content',
      targetKey: 'tx_id',
      as: 'answer'
    })

    models.BoostpowJob.belongsTo(models.Question, {
      foreignKey: 'content',
      targetKey: 'tx_id',
      as: 'question'
    })

    models.BoostpowJob.hasOne(models.BoostpowProof, {
      foreignKey: 'job_tx_id',
      sourceKey: 'tx_id',
      as: 'proof'
    })

  }
};

export function init(sequelize) {

  BoostpowJob.init({
    tx_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tx_index: {
      type:  DataTypes.INTEGER,
      allowNull: false
    },
    diff: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING
    },
    tag: {
      type: DataTypes.STRING
    },
    additionalData: {
      type: DataTypes.TEXT
    },
    userNonce: {
      type: DataTypes.STRING
    },
    useGeneralPurposeBits: {
      type: DataTypes.BOOLEAN
    },
    proof_tx_id: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'BoostpowJob',
    tableName: 'boostpow_jobs'
  });

  return BoostpowJob;

};

