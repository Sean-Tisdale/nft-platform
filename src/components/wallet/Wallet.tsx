import React, { useEffect, useState } from 'react'
import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { formatEther } from '@ethersproject/units'
import walletStyles from './WalletStyles.module.css'

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [1, 4],
})

const Wallet = () => {
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>()
  const [accountNum, setAccountNum] = useState<string>(
    account
      ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}`
      : ''
  )
  const [balance, setBalance] = useState<any>(null)

  const onClick = () => {
    activate(injectedConnector)
  }

  useEffect(() => {
    setAccountNum(
      account
        ? `${account.substring(0, 4)}...${account.substring(
            account.length - 4
          )}`
        : ''
    )
  }, [account, active])

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

  return (
    <>
      {active ? (
        <div className={walletStyles.walletWrapper}>
          <span>Acct:&nbsp;{accountNum}</span>
          <span>
            {balance === null ? 'error' : Math.round(balance * 1e2) / 1e2} ETH
          </span>
        </div>
      ) : (
        <div>
          <button className={walletStyles.walletButton} onClick={onClick}>
            Connect Wallet
          </button>
        </div>
      )}
    </>
  )
}

export default Wallet
