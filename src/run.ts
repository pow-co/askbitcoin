
const Run = require('run-sdk')

const blockchain = new Run.plugins.WhatsOnChain({ network: 'main' })

// @ts-ignore
export const run = new Run({ blockchain })

