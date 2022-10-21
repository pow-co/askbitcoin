
import axios from 'axios'

export async function pay(uri: string): Promise<string> {

    const url = uri.split(':?r=')[1]

    console.log('relayx-pay-protocol', { uri, url })

    const { data } = await axios.post(url, {
        currency: 'BSV',
        chain: 'BSV'
    }, {
        headers: {
            'x-paypro-version': 2,
            'content-type': 'application/payment-request'
        }
    })

    console.log('relayx-pay-protocol.payment-request', data)

    return ''

}
