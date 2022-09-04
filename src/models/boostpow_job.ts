
import { Model, DataTypes, DecimalDataType as Decimal, IntegerDataType as Integer } from 'sequelize';

import events from '../events'

import { getChannel } from 'rabbi'

import { BoostpowProof } from './boostpow_proof'

export class BoostpowJob extends Model {
  id: Integer;
  content: string;
  diff: Decimal;
  timestamp: Date;
  tx_id: string;
  category: string;
  tag: string;
  additionalData: string;
  userNonce: string;
  useGeneralPurposeBits: boolean;
  proof_tx_id: string;
  script: string;
  price: Decimal;
  value: Integer;
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
    script: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    diff: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
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
    hooks: {
      async afterCreate(job: any) {

        // Publish Message to Intra-Process Listeners
        events.emit('askbitcoin.boostpow.job.created', job);

        // Publish Message to Inter-Process Listeners on AMQP
        (async () => {

          const channel = await getChannel()

          const json = JSON.stringify(job.toJSON())

          channel.publish('askbitcoin', 'askbitcoin.boostpow.job.created', Buffer.from(json))

        })();

        // Fill in boostpow proof if already in database
        (async () => {

          if (!job.proof_tx_id) {

            const proof = await BoostpowProof.findOne({
              where: {
                job_tx_id: job.tx_id,
                job_tx_index: job.tx_index
              }
            })

            if (proof) {

              job.proof_tx_id = proof.tx_id

              await job.save()
            }
          }

        })()

      }
    },
    sequelize,
    modelName: 'BoostpowJob',
    tableName: 'boostpow_jobs'
  });

  return BoostpowJob;

};

