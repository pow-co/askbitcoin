
import { Author } from './authors'

import { Question } from './questions'

import { Answer } from './answers'

import { Transaction } from './transactions'

export interface Order {

  author?: Author;

  content: Question | Answer;

  transaction: Transaction;

}
