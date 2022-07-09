
import { Transaction } from './transactions'

import { Order } from './orders'

export interface Proof {

  transaction: Transaction;

  order: Order;

}
