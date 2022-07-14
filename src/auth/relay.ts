
import * as uuid from 'uuid'

import { getPublicKey, isValidSignature } from '../paymail'

export interface AuthorizedRelayx {
  publickey: string;
  paymail: string;
  signature: string;
  sessionId: string;
}

interface RelayAuthParams {
  paymail: string;
  token: string;
}

export async function authenticate(params: RelayAuthParams): Promise<AuthorizedRelayx> {

  let { paymail, publickey } = await getPublicKey(params.paymail)

  let [message, signature] = params.token.split('.')

  let validSignature = await isValidSignature(message, signature, publickey)

  if (!validSignature) {
    throw new Error(`invalid relayx token ${params.token} for paymail ${params.paymail}`)
  }

  const sessionId = uuid.v4()

  const authorized: AuthorizedRelayx = {
    publickey,
    paymail,
    signature,
    sessionId
  }

  return authorized

}
