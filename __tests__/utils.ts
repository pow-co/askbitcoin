require('dotenv').config()

import * as assert from 'assert'

export { assert }

import * as chai from 'chai'

const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

export { expect } 

import * as models from '../src/models'

export async function clearDatabase() {

    await models.Question.destroy({
        where: {},
        truncate: true
    })

    await models.Answer.destroy({
        where: {},
        truncate: true
    })

    await models.BoostpowJob.destroy({
        where: {},
        truncate: true
    })

    await models.BoostpowProof.destroy({
        where: {},
        truncate: true
    })

}

import { NewServer } from '../src/server'

import { Server } from 'hapi'

export var server: Server

before(async () => {

    process.kill(process.pid, "SIGHUP"); 

    server = await NewServer()

})
