
const { HandCashConnect } = require('@handcash/handcash-connect');

import { v4 } from 'uuid'

export interface AuthenticatedHandcash {
  paymail: string;
  handle: string;
  id: string;
  avatarUrl: string;
  sessionId: string;
}

export async function authenticate(token: string): Promise<AuthenticatedHandcash> {

  const handCashConnect = new HandCashConnect(process.env.HANDCASH_APP_ID);

  const cloudAccount = await handCashConnect.getAccountFromAuthToken(token);

  // Fetch and log the entire profile
  const { publicProfile } = await cloudAccount.profile.getCurrentProfile();

  return Object.assign(publicProfile, {sessionId: v4() })

}
