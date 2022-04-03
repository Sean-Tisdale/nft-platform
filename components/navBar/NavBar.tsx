import Link from 'next/link'
import React from 'react'
import navStyles from './NavBarStyles.module.css'
function NavBar() {
  return (
    <div className={navStyles.navBarWrapper}>
      <Link href="/">
        <h1 title="Return to Home Page" className={navStyles.companyName}>
          Hope
        </h1>
      </Link>
      <input className={navStyles.navInput} placeholder="search nfts" />
      <button className={navStyles.navButton}>Search</button>
      <div className={navStyles.navAccountDisplay}>X2B...U90</div>
      <Link href="/userProfile">
        <button className={navStyles.navButton}>Profile</button>
      </Link>
    </div>
  )
}

export default NavBar
