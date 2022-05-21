import { useWeb3React } from '@web3-react/core'
import Link from 'next/link'
import React, { useState } from 'react'
import Wallet from '../wallet/Wallet'
import navStyles from './NavBarStyles.module.css'

function NavBar() {
  const [searchInput, setSearchInput] = useState<string>('')
  const { account } = useWeb3React()

  const handleSearch = () => {
    setSearchInput('')
  }
  const handleChange = (e: any) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }
  const handleKeyPress = (e: any) => {
    if (e.code === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className={navStyles.navBarWrapper}>
      <Link href="/">
        <h1 title="Return to Home Page" className={navStyles.companyName}>
          Hope
        </h1>
      </Link>
      <input
        className={navStyles.navInput}
        placeholder="Search NFT's"
        value={searchInput}
        onChange={handleChange}
        onKeyDown={handleKeyPress}
      />
      <button className={navStyles.navButton} onClick={handleSearch}>
        Search
      </button>
      <div className={navStyles.navAccountDisplay}>
        <Wallet />
      </div>
      <Link href="/userProfile">
                <button className={navStyles.navButton}>Profile</button>
      </Link>
    </div>
  )
}

export default NavBar
