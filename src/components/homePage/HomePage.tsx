import React, { useRef } from 'react'
import Link from 'next/link'
import NavBar from '../navBar/NavBar'
import styles from './/HomePageStyles.module.css'
import { useMoralis } from "react-moralis";
import  UseContractQuery  from 'lib/hooks/useContractQuery'

function HomePage() {

  
  const data = UseContractQuery()


const state = useRef(data?.nftMetadata)

  return (
    <>
      <NavBar />
      <div className={styles.homePageWrapper}>
        <div className={styles.topWrapper}>
          <h1 className={styles.missionStatement}>
            Here at Hope, we believe NFTs should be easily accessible by all.
            We strive to make browsing, minting, and purchasing NFTs a breeze.
            With a wide variety of creators already displaying their work here,
            were confident youll find the perfect artwork to showcase your
            style and personality. Have a look around!
          </h1>
          <Link href="/createNFTPage">
            <button className={styles.createButton}>CREATE</button>
          </Link>
          </div>
          {
         state?.current?.map((data: any) => (
          <Link key={data?.id} href={`/landingPage/${data?.id}`}>
           <div className={styles.nftCard}>
            <img src={data?.image} className={styles.nftDisplay} />
            <div className={styles.nftDescriptionWrapper}>
              <div className={styles.nftTitle}>
               {data?.name}
              </div>
              <div className={styles.nftDescription}>{data?.description}</div>
            </div>
          </div> 
          </Link>
        ))}
      </div>
    </>
  )
}

export default HomePage
