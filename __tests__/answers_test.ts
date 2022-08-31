
import { expect, clearDatabase } from './utils'

import { importAnswersByTxid, parseAnswersByTxid } from '../src/answers'

describe('Importing Questions', () => {

  beforeEach(clearDatabase)

  it('#importAnswersByTxid should parse and persist the answer', async () => {

    const txid = 'dc78a442b219705a21e7b35f22ad6d5c404570137a79d30e68ca34b5c3a80e9c'

    const expectedContent = "Improve mining experience"

    const [{answer, isNew}] = await importAnswersByTxid(txid)

    expect(answer.content).to.be.equal(expectedContent)

    expect(isNew).to.be.equal(true)

    const [{ answer: sameAnswer, isNew: isStillNew }] = await importAnswersByTxid(txid)

    expect(sameAnswer.id).to.be.equal(answer.id)

    expect(isStillNew).to.be.equal(false)

  })

  it('#parseAnswersByTxid should parse questions from a tx', async () => {

    const txid = 'dc78a442b219705a21e7b35f22ad6d5c404570137a79d30e68ca34b5c3a80e9c'

    const expectedContent = "Improve mining experience"

    const [answer] = await parseAnswersByTxid(txid)

    expect(answer.content).to.be.equal(expectedContent)

  })

})
