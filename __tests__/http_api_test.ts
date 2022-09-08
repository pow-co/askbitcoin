
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

    describe('POST /api/v1/questions/new', () => {
        
        it('should return op_return outputs for a new question transaction', () => {


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
