
import { search } from '..'

export async function main() {

  const query = 'profit'

  const { questions, answers } = await search.run({ query })

  for (let result of questions) {

    console.log(result)

  }

  for (let result of answers) {

    console.log(result)

  }

  console.log(`found ${questions.length} question results`)
  
  console.log(`found ${answers.length} answer results`)

}

if (require.main === module) {

  main()

}
