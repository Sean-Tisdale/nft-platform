import React, { useState } from 'react'
import Link from 'next/link'
import type { NextPage } from 'next'
import NavBar from '../navBar/NavBar'
import homeStyles from './/HomePageStyles.module.css'

const HomePage: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className={homeStyles.homePageWrapper}>
        <div className={homeStyles.topWrapper}>
          <h1 className={homeStyles.missionStatement}>
            Here at Hope, we believe NFT's should be easily accessible by all.
            We strive to make browsing, minting, and purchasing NFT’s a breeze.
            With a wide variety of creators already displaying their work here,
            we’re confident you’ll find the perfect artwork to showcase your
            style and personality. Have a look around!
          </h1>
          <Link href="/createNFTPage">
            <button className={homeStyles.createButton}>CREATE</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
