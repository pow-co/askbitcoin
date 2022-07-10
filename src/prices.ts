
import fetch from 'node-fetch'

import BigNumber from 'bignumber.js'

export async function convert(satoshis: number, currency: string) {

  let bsv = new BigNumber(satoshis).dividedBy(100000000)

  let result = await fetch(`https://api.anypayx.com/convert/${bsv}-BSV/to-${currency}`)

  let json = await result.json()

  return json.conversion.output.value

}
