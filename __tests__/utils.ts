
import * as assert from 'assert'

export { assert }

import * as chai from 'chai'

const chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)

const expect = chai.expect

export { expect } 

import { knex } from '../src/knex'

export async function clearDatabase() {

    await knex('questions').del()
    
    await knex('answers').del()

}

