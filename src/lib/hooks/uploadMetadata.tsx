import { uploadData } from './uploadData'

const axios = require('axios')

export const uploadMetadata = async (
  image: any,
  name: string,
  description: string
) => {
  const data = new FormData()
  let imageCID: string
  console.log('hits')

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
