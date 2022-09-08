
import { expect, clearDatabase } from './utils'

import { importAnswersByTxid, parseAnswersByTxid, parseAnswersFromTxHex } from '../src/answers'

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

  it('#parseAnswersFromTxHex should reject invalid transaction hex with empty array', async () => {

    const answers = await parseAnswersFromTxHex('xxx_invalid_xxx')

    expect(answers).to.be.empty

  })


  it('#parseAnswersFromTxHex should return answers from an answer transaction', async () => {

    const answers = await parseAnswersFromTxHex('01000000010c0df249b83c7a52e098e48c586c1e13190b7fcdb71eb3b7f05300ff18090c0c020000006a47304402201c61b26f6acc842a95c35141bd2e0de8e425944e106503a38b6ecc5db3602d26022044c7de74bebdab24c72df3ab5456df5b76c14a4602b8025c634bfbad48923d584121030a094087daa4ff59e49112688a3054670ecdcea3c80eb8b81a4676adcf2cd8e0ffffffff0301410000000000001976a914b519cfd427728a2d4ca8488674dc2575674c097e88ac0000000000000000b1006a076f6e636861696e223148576145414435545843326657484469756139567565334d663856315a6d616b4e06616e737765724c7b7b227175657374696f6e5f74785f6964223a2238643436326664303839323732323761363663346534393035666161333763366433303465313538353035363237623235323561636466353731663330313932222c22636f6e74656e74223a22496d70726f7665206d696e696e6720657870657269656e6365227d60640100000000001976a914d8c851f9fcc01c53f6c6e62e259b065d2b85b9d688ac00000000')

    expect(answers.length).to.be.equal(1)

  })

})
