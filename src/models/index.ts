'use strict';

import { Model, Sequelize } from 'sequelize'

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.json')[env];

const db: any = {};

export const sequelize = new Sequelize(process.env[config.use_env_variable], config);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const models = require('require-all')({

  dirname: __dirname,
  
  filter: function(name: string): string | boolean {
    
    if (!name.match(/(.+)\.ts$/)) {
      return false
    }

    if (name === 'index.ts') {
      return false
    }

    return name
  },
  map: function(name: string): string {

    return name.split('_').map(capitalizeFirstLetter).join('').replace('.ts', '')

  },
  resolve: function({ init }: { init: Function }): Model {

    const model = init(sequelize);

    db[model.name] = model

    return model
  }
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

import { Question } from './question'
import { Answer } from './answer'
import { BoostpowProof } from './boostpow_proof'
import { BoostpowJob } from './boostpow_job'

export { Question }
export { Answer }
export { BoostpowProof }
export { BoostpowJob }

db.BoostpowJob.hasOne(BoostpowProof, {
  foreignKey: 'job_tx_id',
  sourceKey: 'tx_id',
  as: 'proof'
});

db.Question.hasMany(Answer, {
  foreignKey: 'question_tx_id',
  sourceKey: 'tx_id',
  as: 'answers'
})

db.Question.hasMany(BoostpowJob, {
  foreignKey: 'content',
  sourceKey: 'tx_id',
  as: 'boostpow_jobs'
})

db.Question.hasMany(BoostpowProof, {
  foreignKey: 'content_tx_id',
  sourceKey: 'tx_id',
  as: 'boostpow_proofs'
})

db.Answer.hasMany(BoostpowJob, {
  foreignKey: 'content',
  sourceKey: 'tx_id',
})

db.Answer.hasMany(BoostpowProof, {
  foreignKey: 'content_tx_id',
  sourceKey: 'tx_id'
})

db.Answer.belongsTo(Question)

db.Question.hasMany(Answer, {
  foreignKey: 'question_tx_id',
  sourceKey: 'tx_id'
})

export { Event } from './event'

export default db
