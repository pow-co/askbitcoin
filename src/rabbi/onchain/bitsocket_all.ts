import log from "../../log"

// Base64 encode your bitquery
const b64 = Buffer.from(JSON.stringify({
    "v": 3, "q": { "find": {} }
  })).toString("base64")
  
  // Subscribe
  const sock = new EventSource('https://txo.bitsocket.network/s/'+b64)
  
  sock.onmessage = function(e) {
  
    const { data } = JSON.parse(e.data)
  
    for (let item of data) {
  
      try {
  
        const txid = item['tx']['h']
  
        console.log({ txid })
    
        for (let input of item['in']) {
    
          console.log(input.e)
        } 
  
      } catch(error) {
  
        log.debug('bitsocket.error', error)
    
      }
  
      //console.log(item)
  
    }
  
  }
  