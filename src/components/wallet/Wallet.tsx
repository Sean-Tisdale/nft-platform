import React, { useEffect, useState } from 'react';
import { useMoralis } from "react-moralis";
import { InjectedConnector } from '@web3-react/injected-connector'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { formatEther } from '@ethersproject/units'
import walletStyles from './WalletStyles.module.css'
import { UseEagerConnect } from 'lib/hooks/providerHook';

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 4],
})

function Wallet() {
  const { chainId, activate, library, account } = useWeb3React<Web3Provider>()
  const { isWeb3Enabled, enableWeb3, isWeb3EnableLoading, authenticate, isAuthenticated, logout  } = useMoralis()
  const [accountNum, setAccountNum] = useState<string>(
    account && isAuthenticated
      ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
      : ''
  )
  const [balance, setBalance] = useState<any>(null)
  
    useEffect(() => {
    if (isAuthenticated) {
      setAccountNum(
        account
          ? `${account.substring(0, 4)}...${account.substring(
              account.length - 4
            )}`
          : ''
      )
    }}, [account, isAuthenticated])
  

    
      useEffect((): any => {
        if (!!account && !!library) {
          let stale = false
    
          library
            .getBalance(account)
            .then((balance: any) => {
              if (!stale) {
                setBalance(formatEther(balance))
              }
            })
            .catch(() => {
              if (!stale) {
                setBalance(null)
              }
            })
    
          return () => {
            stale = true
            setBalance(undefined)
          }
        }
      }, [account, library, chainId])
        
    const login = async () => {
      if (!isAuthenticated) {
        activate(injectedConnector),
        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user!.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }
    const triedEager = UseEagerConnect()
    useEffect(() => {
      const connectorId = window.localStorage.getItem("connectorId")
      if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
        enableWeb3({ provider: connectorId as any})
      }, [isAuthenticated, isWeb3Enabled])

    return (
          <>
            {isAuthenticated ? (
              <div className={walletStyles.walletWrapper} onClick={logOut} title="Logout?"  >
                <span>Acct:&nbsp;{accountNum}</span>
                <span>
                  {balance === null ? 'error' : Math.round(balance * 1e2) / 1e2} ETH
                </span>
              </div>
            ) : (
              <div>
                <button className={walletStyles.walletButton} onClick={login}>
                  Connect Wallet
                </button>
              </div>
            )}
          </>
        )
}

export default Wallet;