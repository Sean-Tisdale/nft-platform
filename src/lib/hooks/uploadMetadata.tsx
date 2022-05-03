import { useC } from './useC'

const axios = require('axios')

export const uploadMetadata = async (
  image: any,
  name: string,
  description: string
) => {
  const { mintNft } = useC()
  const data = new FormData()
  let imageCID: string
  console.log('hits')

  const uploadData = async (JSONBody: {
    name: string
    imageCID: string
    description: string
  }) => {
    // const metadataObj = {
    //   description: description,
    //   image: imageCID,
    //   name: name,
    // }

    // try {
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
          console.log(response.data.IpfsHash as string),
          mintNft(response.data.IpfsHash as string)
        )
      })
      .catch(function (err: { message: any }) {
        console.log(err)
        return {
          message: err.message,
        }
      })
  }
  //     return (
  //       await mintNft(uploadData.data.IpfsHash as string),
  //       console.log(uploadData.data.IpfsHash as string)
  //     )
  //   } catch (err) {
  //     console.error(err, 'error uploading metadata')
  //   }
  // }
  try {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    console.log(image, 'line 24 ipfs')
    data.append('file', image)
    const uploadImage = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
      },
    })
    return (
      console.log('fires'),
      console.log(uploadImage.data.IpfsHash as string),
      (imageCID = uploadImage.data.IpfsHash as string),
      uploadData({ name, imageCID, description })
    )
  } catch (err: any) {
    console.error(err, 'error uploading image')
  }
}
