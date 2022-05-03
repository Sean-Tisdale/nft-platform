import { ContractAddresses } from './index'
import { NETWORK_TYPES } from './networks'

const addresses: { [network in NETWORK_TYPES]: ContractAddresses } = {
  [NETWORK_TYPES.RINKEBY]: {
    Caddress: '0x4D86562242260a595930252a6b95Cfc8cf120442',
  },
} as any

export default addresses
