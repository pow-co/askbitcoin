
import axios from 'axios'

import BigNumber from 'bignumber.js'

export async function convert(satoshis: number, currency: string): Promise<number> {

  let bsv = new BigNumber(satoshis).dividedBy(100000000).toNumber()

  let { data } = await axios.get(`https://api.anypayx.com/convert/${bsv}-BSV/to-${currency}`)

  return data.conversion.output.value

}

export async function convertPrice(value: number, input: string, output: string) {

  let { data } = await axios.get(`https://api.anypayx.com/convert/${value}-${input}/to-${output}`)

  return data.conversion.output.value

}

export function toSatoshis(bsv_amount: number): number {
  return new BigNumber(bsv_amount).times(100000000).toNumber()
}

interface DifficultyQuote {
  satoshis: number;
  difficulty: number;
}

export async function quoteDifficulty({ currency, value }): Promise<DifficultyQuote> {

  value = await convertPrice(value, currency, 'USD')

  const pricePerDifficulty = { currency: 'USD', value: 100 }

  const difficulty = new BigNumber(value).dividedBy(pricePerDifficulty.value).toNumber()

  const price = new BigNumber(difficulty).times(pricePerDifficulty.value).toNumber()

  const bsv_amount = await convertPrice(price, 'USD', 'BSV')

  const satoshis = toSatoshis(bsv_amount)

  return { satoshis, difficulty }

}
