import { useNftContract } from '../contracts'
import { useWeb3React } from '@web3-react/core'
import { BigNumberish } from 'ethers'

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
  return {
    mintNft,
  }
}
