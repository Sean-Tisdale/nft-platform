const axios = require('axios')

export const pinJSONToIPFS = async (JSONBody: {
  name: string
  image: string | undefined
  description: string
}) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  return axios
    .post(url, JSONBody, {
      headers: {
        maxBodyLength: 'Infinity',
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
        pinata_secret_api_key: process.env
          .NEXT_PUBLIC_PINATA_SECRET_KEY as string,
      },
    })
    .then(function (response: { data: { IpfsHash: string } }) {
      return {
        pinataUrl:
          `https://gateway.pinata.cloud/ipfs/` + response.data.IpfsHash,
      }
    })
    .catch(function (err: { message: any }) {
      console.log(err)
      return {
        message: err.message,
      }
    })
}
