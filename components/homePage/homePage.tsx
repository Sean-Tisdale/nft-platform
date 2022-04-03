import React from 'react'
import type { NextPage } from 'next'
import NavBar from '../navBar/NavBar'
import homeStyles from './/HomePageStyles.module.css'
import Wallet from '../wallet/Wallet'
const HomePage: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className={homeStyles.homePageWrapper}>
        <Wallet />
        <h1 className={homeStyles.missionStatement}>
          Here at Hope, we believe NFT's should be easily accessible by all. We
          strive to make browsing, minting, and purchasing NFT’s a breeze. With
          a wide variety of creators already displaying their work here, we’re
          confident you’ll find the perfect artwork to showcase your style and
          personality. Have a look around!
        </h1>
        <h1 className={homeStyles.test}>bottom of page</h1>
      </div>
    </>
  )
}

export default HomePage
