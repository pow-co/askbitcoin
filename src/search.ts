
import { models } from './models'

export interface SearchQuery {
  query: string;
}

export interface SearchResults {
  questions: SearchResult[];
  answers: SearchResult[];
}

export interface SearchResult {

}

export async function run(params: SearchQuery) {

  const [questions, answers] = await Promise.all([
    models.Question.search(params.query),
    models.Answer.search(params.query)
  ])

  return {
    questions,
    answers 
  }

}
