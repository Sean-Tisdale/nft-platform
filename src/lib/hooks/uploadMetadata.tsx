const axios = require('axios')

export const uploadMetadata = async (
  name: string,
  image: any,
  description: string
) => {
  const data = new FormData()
  let imageCID: string

  try {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
    data.append('file', image)
    const uploadImage = await axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
        pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
      },
    })
    return (
      imageCID = uploadImage.data.IpfsHash as string,
      uploadData(name, imageCID, description)
    )
  } catch (err: any) {
    console.error(err, 'error uploading image')
  }
}
const uploadData = async (
  name: string,
  imageCID: string,
  description: string,
) => {
  const metadata = {
    name: name,
    image: imageCID,
    description: description
  }
  try {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    return axios
      .post(url, metadata, {
        maxBodyLength: 'Infinity',
        headers: {
          pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY,
          pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY,
        },
      })
      .then(function (response: { data: { IpfsHash: string } }) {
        return (
          response.data.IpfsHash as string
        )
      })
  } catch (err: any) {
    console.log(err)
    return {
      message: err.message,
    }
  }
}