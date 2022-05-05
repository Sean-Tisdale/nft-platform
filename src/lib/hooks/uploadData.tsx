import { useC } from './useC'

const axios = require('axios')

export const uploadData = async (JSONBody: {
  name: string
  imageCID: string
  description: string
}) => {
  const { mintNft } = useC()
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    return axios
      .post(url, JSONBody, {
        maxBodyLength: 'Infinity',
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
        },
      })
      .then(function (response: { data: { IpfsHash: string } }) {
        return (
          response.data.IpfsHash as string,
          mintNft(response.data.IpfsHash as string)
        )
      })
  } catch (err: any) {
    console.log(err)
    return {
      message: err.message,
    }
  }
}
