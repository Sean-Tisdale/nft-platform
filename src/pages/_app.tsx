import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import {
  ExternalProvider,
  JsonRpcFetchFunc,
  Web3Provider,
} from '@ethersproject/providers'
import { MoralisProvider } from "react-moralis";


function getLibrary(
  provider: ExternalProvider | JsonRpcFetchFunc
): Web3Provider {
  const library = new Web3Provider(provider)

  return library
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
          <MoralisProvider serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL as string} appId={process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID as string}>
      <Component {...pageProps} />
      </MoralisProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
