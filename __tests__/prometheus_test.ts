
import { expect, server } from './utils'

describe('Scraping Prometheus Metrics', () => {

  it('GET /metrics should provide the metrics', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/metrics'
    })

    expect(response.statusCode).to.be.equal(200)

  })

  it.skip('GET /liveness should return success', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/liveness'
    })

    expect(response.statusCode).to.be.equal(200)

  })

  it.skip('GET /readiness should return success', async () => {

    const response = await server.inject({
      method: 'GET',
      url: '/readiness'
    })

    expect(response.statusCode).to.be.equal(200)

  })

})
