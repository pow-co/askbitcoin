
import { expect, clearDatabase } from './utils'

import { importQuestionsByTxid, parseQuestionsByTxid } from '../src/questions'

describe('Importing Questions', () => {

  beforeEach(clearDatabase)

  it('#importQuestionsByTxid should parse and persist the question', async () => {

    const txid = '142d654267896e8bcfca0cd99e0589023272fd2dcc016cb729b1da6fbc2925e3'

    const expectedContent = "Why doesn't this stupid app work right?"

    const [{question, isNew}] = await importQuestionsByTxid(txid)

    console.log('QISNEW', { question, isNew })

    expect(question.content).to.be.equal(expectedContent)

    expect(isNew).to.be.equal(true)

    const [{ question: sameQuestion, isNew: isStillNew }] = await importQuestionsByTxid(txid)

    expect(sameQuestion.id).to.be.equal(question.id)

    expect(isStillNew).to.be.equal(false)

  })

  it('#importQuestionsByTxid should parse and persist the question', async () => {

    const txid = '13c328101d0da8e65a02a86f36593a9ee4cdc2f7b8e4be78e477fa06201c71f8'

    const expectedContent = "Why doesn't this stupid app work right?"

    const [{question, isNew}] = await importQuestionsByTxid(txid)

    expect(question.content).to.be.equal(expectedContent)

    expect(isNew).to.be.equal(true)

    const [{ question: sameQuestion, isNew: isStillNew }] = await importQuestionsByTxid(txid)

    expect(sameQuestion.id).to.be.equal(question.id)

    expect(isStillNew).to.be.equal(false)

  })

  it('#parseQuestionsByTxid should parse questions from a tx', async () => {

    const txid = '142d654267896e8bcfca0cd99e0589023272fd2dcc016cb729b1da6fbc2925e3'

    const expectedContent = "Why doesn't this stupid app work right?"

    const [question] = await parseQuestionsByTxid(txid)

    expect(question.content).to.be.equal(expectedContent)

  })

})
