
import { Question } from './questions'

import { Answer } from './answers'

import { Order } from './orders'

import { Proof } from './proofs'

export interface Author {

  public_key: string;

  paymail?: string;

  questions?: Question[];

  answers?: Answer[];

  proofs?: Proof[];

  orders?: Order[];

}

