const axios = require('axios')

export const pinFileToIPFS = async (image: any) => {
  const data = new FormData()

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
  data.append('file', image)

  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        pinata_api_key: process.env.NEXT_PUBLIC_PINATA_API_KEY as string,
        pinata_secret_api_key: process.env
          .NEXT_PUBLIC_PINATA_SECRET_KEY as string,
      },
    })
    .then(function (response: { data: { IpfsHash: string } }) {
      return console.log(response.data.IpfsHash)
    })
    .catch(function (err: { message: any }) {
      console.log(err)
      return console.log(err.message)
    })
}

// const uploadMetadata = async (mintObj: any) => {

//     console.log('hits')

//     try {
//       const url = https://api.pinata.cloud/pinning/pinFileToIPFS
//       console.log(image, 'line 24 ipfs')
//       data.append('file', image)
//       const uplaodImage = await axios.post(url, data, {
//         maxBodyLength: 'Infinity',
//         headers: {
//           pinata_api_key: process.env.NEXT_PUBLIC_PINATA_PUBLIC_KEY,
//           pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
//         }
//       })
//       return (
//         console.log('fires'),
//         console.log(uplaodImage.data.IpfsHash as string),
//         (imageCID = uplaodImage.data.IpfsHash as string),
//         uploadData(mintObj, imageCID)
//       )
//     } catch (err: any) {
//       console.error(err, 'error uploading image')
//     }
//   }

//   const uploadData = async (mintObj: any, imageCID: string) => {
//     const metadataObj = {
//       description: description,
//       image: imageCID,
//       name: name
//     }

//     try {
//       const url = https://api.pinata.cloud/pinning/pinJSONToIPFS

//       const uploadData = await axios.post(url, metadataObj, {
//         maxBodyLength: 'Infinity',
//         headers: {
//           pinata_api_key: process.env.NEXT_PUBLIC_PINATA_PUBLIC_KEY,
//           pinata_secret_api_key: process.env.NEXT_PUBLIC_PINATA_SECRET_KEY
//         }
//       })
//       return (
//         console.log(uploadData.data.IpfsHash as string),
//         await mint(
//           mintObj.tokenStandard,
//           uploadData.data.IpfsHash as string,
//           mintObj.amount,
//           mintObj.royalties,
//           mintObj.collectionName
//         )
//       )
//     } catch (err) {
//       console.error(err, 'error uploading metadata')
//     }
//   }
