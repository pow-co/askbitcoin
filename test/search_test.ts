
import { expect } from 'chai'

import { search } from '../src'

describe("Searching Questions & Answers", () => {

  describe("search library package", () => {

    it('should return search results based on full text', async () => {

      const results: search.SearchResults = await search.run({ query: "profits" })

      expect(results.items).to.be.an('array')

    })

  })

  describe("search http api", () => {

  })

})
