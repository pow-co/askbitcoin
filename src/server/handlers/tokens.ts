
import { log } from '../../log'

const axios = require('axios')

const tokens = {
  '93f9f188f93f446f6b2d93b0ff7203f96473e39ad0f58eb02663896b53c4f020_o2': {
    symbol: 'POWCO',
    domain: 'pow.co' 
  },
  'e27f2c9d8f2d32a22c2c1c8f9ff76d5cbf859b3584c2fed539ddb758f38c8807_o2': {
    symbol: 'ASK',
    domain: 'askbitcoin.ai' 
  }
}

interface Balance {
  token_id: string;
  value: number;
  domain?: string;
}

interface Metadata {
  description: string;
  image: string;
  isCollection: boolean;
  name: string;
  numbered: boolean;
  symbol: string;
  nft: boolean;
  total: number
  berry: {
    txid: string;
  },
  ticker?: string;
}

interface RelayxBalance2Response {
  code: number;
  data: {
    balances: {
      [key: string]: number;
    };
    metadata: {
      [key: string]: Metadata;
    }
  };

}

async function listRUNBalances(address: string): Promise<Balance[]> {

  const { data } = await axios.get(`https://staging-backend.relayx.com/api/user/balance2/${address}`)

  const { balances } = data.data

  return Object.keys(balances).map(token_id => {

    const balance = {
      token_id,
      value: balances[token_id]
    }

    if (tokens[token_id]) {
      balance['symbol'] = tokens[token_id]['symbol']
      balance['domain'] = tokens[token_id]['domain']
    }

    return balance

  })

}

/* show POWCO and ASK token amounts for an address */
export async function show(req) {

  try {

    const result: Balance[] = await listRUNBalances(req.params.address)

    log.info('api.handlers.tokens.show.result', result)

    return result

  } catch(error) {

    log.error('api.handlers.tokens.show.error', error)

  }

}

