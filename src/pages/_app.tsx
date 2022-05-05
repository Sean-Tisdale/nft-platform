import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import {
  ExternalProvider,
  getDefaultProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers'

function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider {
  const library = new Web3Provider(provider)

  console.log(library, 'web 3 library', getDefaultProvider())

  return library
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
