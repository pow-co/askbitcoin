
import { expect, server } from './utils'

describe('HTTP API', () => {

    describe('GET /api/v0/status', () => {
        
        it('should return 200 success code', async () => {

            const { statusCode } = await server.inject({
                method: 'GET',
                url: '/api/v0/status'
            })

            expect(statusCode).to.be.equal(200)
        })

    })

    describe("Importing Answers", () => {

      it("POST /api/v1/answers/{txid} should import an Answer by txid", async () => {

        const txid = 'dc78a442b219705a21e7b35f22ad6d5c404570137a79d30e68ca34b5c3a80e9c'

        const result = await server.inject({
          method: 'POST',
          url: `api/v1/answers/${txid}`
        })

        expect(result.statusCode).to.be.equal(200)

      })

      it("POST /api/v1/answers should import an Answer by txhex", async () => {

        const txhex = '01000000010c0df249b83c7a52e098e48c586c1e13190b7fcdb71eb3b7f05300ff18090c0c020000006a47304402201c61b26f6acc842a95c35141bd2e0de8e425944e106503a38b6ecc5db3602d26022044c7de74bebdab24c72df3ab5456df5b76c14a4602b8025c634bfbad48923d584121030a094087daa4ff59e49112688a3054670ecdcea3c80eb8b81a4676adcf2cd8e0ffffffff0301410000000000001976a914b519cfd427728a2d4ca8488674dc2575674c097e88ac0000000000000000b1006a076f6e636861696e223148576145414435545843326657484469756139567565334d663856315a6d616b4e06616e737765724c7b7b227175657374696f6e5f74785f6964223a2238643436326664303839323732323761363663346534393035666161333763366433303465313538353035363237623235323561636466353731663330313932222c22636f6e74656e74223a22496d70726f7665206d696e696e6720657870657269656e6365227d60640100000000001976a914d8c851f9fcc01c53f6c6e62e259b065d2b85b9d688ac00000000'

        const result = await server.inject({
          method: 'POST',
          url: `api/v1/answers`,
          payload: {
            transaction: txhex
          }
        })

        expect(result.statusCode).to.be.equal(200)

        expect(result.body.answers).to.be.an('array')

        expect(result.body.answers.length).to.be.equal(1)

      })

    })

    describe('POST /api/v1/questions/new', () => {
        
        it('should return op_return outputs for a new question transaction', async () => {

          const result = await server.inject({
            method: 'POST',
            url: `api/v1/questions/new`
          })

          expect(result.statusCode).to.be.equal(200)

        })

    })

    describe('POST /api/v1/answers/new', () => {
        
        it('should return op_return outputs for a new answer transaction', () => {


        })

    })

    describe('POST /api/v1/questions', () => {
        
        it('should broadcast valid question transactions to the blockchain', () => {


        })

        it('should case an event askbitcoin.question.created to be emitted', () => {


        })

        it('should create a record in the questions database table', () => {


        })

    })

    describe('POST /api/v1/answers', () => {
        
        it('should broadcast valid answer transactions to the blockchain', () => {


        })

        it('should case an event askbitcoin.answer.created to be emitted', () => {


        })

        it('should create a record in the answer database table', () => {


        })

    })

    describe('GET /api/v1/questions', () => {
        
        it('should return most boosted questions within a given time period', async () => {

            const response = await server.inject({
                method: 'GET',
                url: '/api/v1/questions'
            })

            expect(response.status).to.be.equal(200)

            expect(response.result.questions).to.be.a('array')

        })

        it('should accept start and end dates to filter questions by proof of work', async () => {

            const response = await server.inject({
                method: 'GET',
                url: '/api/v1/questions'
            })

            expect(response.statusCode).to.be.equal(200)

            expect(response.result.questions).to.be.a('array')

        })

    })

    describe('GET /api/v1/recent/questions', () => {
        
        it('should return most recent questions regardless of proofofwork', async () => {

            const response = await server.inject({
                method: 'GET',
                url: '/api/v1/recent/questions'
            })

            expect(response.statusCode).to.be.equal(200)

            expect(response.result.questions).to.be.a('array')

        })

    })

    describe('GET /api/v1/answers', () => {
        
        it('should return most boosted answers within a given time period', async () => {

            const response = await server.inject({
                method: 'GET',
                url: '/api/v1/answers'
            })

            expect(response.statusCode).to.be.equal(200)

            expect(response.result.answers).to.be.a('array')            

        })

        it('should accept start and end dates to filter answers by proof of work', async () => {

            const response = await server.inject({
                method: 'GET',
                url: '/api/v1/answers'
            })

            expect(response.statusCode).to.be.equal(200)

            expect(response.result.answers).to.be.a('array')    

        })

    })

    describe('GET /api/v1/recent/answers', () => {
        
        it('should return most recent answers regardless of proofofwork', async () => {

            const response = await server.inject({
                method: 'GET',
                url: '/api/v1/answers'
            })

            expect(response.statusCode).to.be.equal(200)

            expect(response.result.answers).to.be.a('array')

        })

    })

    describe('GET /api/v1/questions/{tx_id}', () => {
        
        it('should return the question along with all proof of work for the time frame', () => {


        })

    })

    describe('GET /api/v1/answers/{tx_id}', () => {
        
        it('should return the answer along with all proof of work for the time frame', () => {


        })

    })

    describe('GET /api/v1/boostpow/{tx_id}/new', () => {
        
        it('should create a new Boost Pow job script for payment via bip270 payment protocol', () => {


        })

    })

    describe('POST /api/v1/transactions', () => {

        it('should reject accept any invalid transaction via bip270 payment protocol', async () => {

            const response = await server.inject({
                method: 'POST',
                url: '/api/v1/transactions',
                payload: {
                    transaction: 'xxxx_invalid_xxxx'
                }
            })

            expect(response.statusCode).to.be.equal(400)

        })

        it('should accept any valid transaction via bip270 payment protocol', () => {

        })

        it('should detect and emit a askbitcoin.question.transaction event given a question transaction', () => {
            
        })

        it('should detect and emit a askbitcoin.answer.transaction event given an answer transaction', () => {
            
        })

        it('should detect and emit a boostpow.job event given a boostpow job transaction', () => {
            
        })

        it('should detect and emit a boostpow.proof event given a boostpow proof transaction', () => {
            
        })

    })
    
})
