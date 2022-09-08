
import { quoteDifficulty, convert } from '../src/prices'
import { expect } from './utils'

describe("Prices", () => {

    it('#quoteDifficulty should show the difficulty worth $1', async () => {

        const { satoshis, difficulty } = await quoteDifficulty({ currency: 'USD', value: 1 })

        expect(satoshis).to.be.greaterThan(1000)

        expect(difficulty).to.be.greaterThan(0.00001)

    })

    it('#convert should convert satoshis to another currency', async () => {

        const value = await convert(10_000_000, 'RUB')

        expect(value).to.be.greaterThan(1)

    })

})