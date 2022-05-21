import { useEffect } from "react"
import { useMoralisQuery, useMoralis } from "react-moralis"

const axios = require('axios')

const nftMetadata:  any[] = []

export function UseContractQuery() {
    const {isAuthenticating, isAuthenticated} = useMoralis()    

    const { fetch } = useMoralisQuery(
        "allNfts",
        (query: { equalTo: (arg0: string, arg1: string) => any }) => query.equalTo("address", "0x4d86562242260a595930252a6b95cfc8cf120442"),
        [],
        { autoFetch: false }
      ) 
const contractCall = async () => {
      const results: any = await fetch()

results?.map(async(data: any) => {
   const token_uri = data?.attributes?.tokenURI

   if(token_uri === null || undefined || !token_uri.startsWith('Qm')) {
    return console.log(token_uri, 'Invalid token uri')
  
    } else if  (token_uri != null || undefined && token_uri.startsWith('Qm')) {
            const url = `https://gateway.pinata.cloud/ipfs/${token_uri}`
            
                  const tokenMetadata = await axios.get(url).then(function (response: any) {
                    if(response.data.image != undefined && response.data.image.startsWith('Qm')){

                    return nftMetadata.push({
                      name: response.data.name,
                      image: `https://ipfs.io/ipfs/${response.data.image}`,
                      description: response.data.description,
                      id: data.attributes.tokenId,
                      owner: data.attributes.owner,
                      address: data.attributes.address
                    })
                  } 
                  })
                  return nftMetadata
                } else {
                  console.log(token_uri, 'Invalid token uri')
                }

})
    }
        useEffect(() => {
            if(isAuthenticated) {
            contractCall()
            }
          }, [ isAuthenticated])
          
          return { nftMetadata }
}