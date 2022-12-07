
import { badRequest } from 'boom'
import { search } from '../..'
import log from '../../log'

export async function show(req, h) {

    try {

        console.log('request query', req.query)

        const { q: query } = req.query

        const results = await search.run({ query })

        return results

    } catch(error) {

        log.error(error)

        return badRequest(error)
    }

}