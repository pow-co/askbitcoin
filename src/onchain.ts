
import { onchain } from 'stag-wallet'

export async function findOrCreate({where, defaults}: {where: any, defaults: any}) {

  var isNew = false

  var record = await onchain.findOne(where)

  if (!record) {

    isNew = true

    const postResult = await onchain.post(defaults)

    await onchain.findOne(where)

    record = await onchain.findOne(where)

  }

  return [record, isNew]

}
