
import * as uuid from 'uuid'

import { getPublicKey, isValidSignature } from '../paymail'

import { PublicKey } from 'bsv'

import { jwtVerify, createJwt, AuthToken } from '../auth'

export interface AuthorizedTwetch {
  publickey: string;
  paymail: string;
  signature: string;
  sessionId: string;
}

interface AuthParams {
  paymail: string;
  token: string;
}

interface AuthTwetch {
  paymail: string;
  publicKey: string;
  message: string;
  sessionId: string;
  signature: string;
}

export class TwetchAuthError extends Error {
  name = 'twetch.auth.error'
}

interface TwetchSession {
  token: string;
  record: any;
}

export async function authTwetch(auth: AuthTwetch): Promise<TwetchSession> {

  let { paymail, publickey } = await getPublicKey(auth.paymail)

  if (publickey !== auth.publicKey) {

    throw new TwetchAuthError('provided publickey does not match paymail publickey')

  }

  const pubkey = PublicKey.fromString(auth.publicKey)

  const nonce = auth.message.split("/").pop()

  let token = createJwt(paymail, nonce)

  var record = {}

  return { token, record }

}

export async function validateAuth(token: string): Promise<AuthToken> {

  let decoded: AuthToken = await jwtVerify(token)

  return decoded;

}

