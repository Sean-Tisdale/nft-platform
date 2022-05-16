import React from 'react'
import NavBar from '../navBar/NavBar'
import styles from './/UserProfileStyles.module.css'
import { useMoralis } from "react-moralis"
import { NftQuery } from 'lib/hooks/nftQuery'
import Link from 'next/link'
import { UseContractQuery } from 'lib/hooks/useContractQuery'

function UserProfile() {
  
  const { isAuthenticated, account } = useMoralis()
  
  const data = UseContractQuery()

const useData = data.nftMetadata
const currentUser: any[] = []

const funct = (data: any) => {
if (data.owner === account) {
  currentUser.push(data)
}
return currentUser
}
  const getOwners = useData.map(funct)

return (
    <>
      <NavBar />
      <div className={styles.userProfileWrapper}>

       {isAuthenticated && 
      currentUser.map((data: any) => (
         <Link key={data.id} href={`/userProfile/${data.id}`}>
           <div  className={styles.nftCard}>
            <img src={data.image} className={styles.nftDisplay} />
            <div className={styles.nftDescriptionWrapper}>
              <div className={styles.nftTitle}>
               {data.name}
              </div>
              <div className={styles.nftDescription}>{data.description}</div>
            </div>
          </div> 
          </Link>
        ))}
      </div>
    </>
  )
}

export default UserProfile
