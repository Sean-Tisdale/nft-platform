import React, { useMemo } from 'react'

// - Utils
import addresses from './address'

// - Web3 Import
import * as ethers from 'ethers'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import {
  chainIdToNetworkType,
  defaultNetworkId,
  NETWORK_TYPES,
} from './networks'

import { Nft__factory } from '../../types/factories/Nft__factory'
import { Nft } from 'types'

export interface ContractAddresses {
  Caddress: string
}

export interface Contracts {
  Caddress: Nft
}

const UseNftContract = (): Contracts | null => {
  const context = useWeb3React<Web3Provider>()
  const { library, active, chainId } = context
  const contract = useMemo((): Contracts | null => {
    let contracts
    let signer: ethers.VoidSigner | ethers.Signer = new ethers.VoidSigner(
      ethers.constants.AddressZero
    )
    if (!library) {
      contracts = addresses[chainIdToNetworkType(defaultNetworkId)]
    } else {
      if (!chainId) {
        console.error(`No chainid detected;`)
        return null
      }

      contracts = addresses[chainIdToNetworkType(chainId)]
      signer = library.getSigner()
    }

    if (!contracts) {
      console.error(`chain not supported`)
      return null
    }

    return {
      Caddress: Nft__factory.connect(contracts.Caddress, signer),
    }
  }, [active, library, chainId])
  return contract
}

export default UseNftContract
