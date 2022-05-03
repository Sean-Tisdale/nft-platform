import Link from 'next/link'
import React, { useRef, useState } from 'react'
import NavBar from '../navBar/NavBar'
import styles from './/UserProfileStyles.module.css'

function UserProfile() {
  const [nftImage, setNftImage] = useState<any>()
  const inputFile = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputFile.current?.click()
  }
  const handleChange = (e: any) => {
    const file = e.currentTarget.files[0]
    setNftImage(URL?.createObjectURL(file))
  }
  return (
    <>
      <NavBar />
      <div className={styles.userProfileWrapper}>
        <div className={styles.nftCard}>
          <img src={nftImage} className={styles.nftDisplay} />
          <div className={styles.nftDescriptionWrapper}>
            <div className={styles.nftTitle} onClick={handleClick}>
              Bored Ape
            </div>
            <div className={styles.nftDescription}>An Ape that's bored</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserProfile
