import { InjectedConnector as MetaMask } from '@web3-react/injected-connector'
import { NetworkConnector as Network } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

const RPC_URLS: { [chainId: number]: string } = {
  1: 'https://mainnet.infura.io/v3/cec62322a71c422da9c7a83d53b95a98',
  4: 'https://rinkeby.infura.io/v3/cec62322a71c422da9c7a83d53b95a98',
}

export const injected = new MetaMask({
  supportedChainIds: [1, 4],
})

export const network = new Network({
  urls: { 1: RPC_URLS[1], 4: RPC_URLS[4] },
  defaultChainId: 4,
})

export const walletconnect = new WalletConnectConnector({
  rpc: { 1: RPC_URLS[1] },
  bridge: 'https://bridge.walletconnect.org',
  supportedChainIds: [1, 4],
})
