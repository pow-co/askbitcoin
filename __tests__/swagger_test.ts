
import { server, start } from '../src/server'

import { expect } from './utils'

describe('Swagger Documentation', () => {

  before(async () => {

    await start()

  })

  it('GET /swagger.json should provide the API schema', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/swagger.json'
    })

    expect(response.statusCode).to.be.equal(200)

  })

  it('GET /api should return the swagger documentation', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/api'
    })

    expect(response.statusCode).to.be.equal(200)

  })

})

