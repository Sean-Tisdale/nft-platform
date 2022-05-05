import { useNftContract } from '../contracts'
import { useWeb3React } from '@web3-react/core'

export function useC() {
  const contracts = useNftContract()?.Caddress
  const { account } = useWeb3React()

  const mintNft = async (tokenURI: string) => {
    try {
      const tx = await contracts?.mint(account as string, tokenURI)
      return await tx?.wait()
    } catch (err) {
      console.error(err, 'Error Minting')
    }
  }
  const sellNft = async (from: any, to: any, tokenId: any) => {
    try {
      const tx = await contracts?.transferFrom(from, to, tokenId, {
        gasLimit: 1000000,
      })
      return await tx?.wait()
    } catch (err) {
      console.error(err, 'Error selling nft')
    }
  }

  // const buy = async (tokenId: any, to: any, from: any) => {
  //   try {
  //     const tx = await contracts?.transferFrom(account as string,
  //       tokenId,

  //     )
  //     return await tx?.wait()
  //   } catch (err) {
  //     console.error(err, 'Error buying nft')
  //   }
  // }
  return {
    mintNft,
    sellNft,
  }
}
