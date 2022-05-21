import React, { useRef } from 'react'
import NavBar from '../navBar/NavBar'
import styles from './/UserProfileStyles.module.css'
import Link from 'next/link'
import  {UseContractQuery}  from 'lib/hooks/useContractQuery'
import { useWeb3React } from '@web3-react/core'

function UserProfile() {
  
  const { account } = useWeb3React()
  
  const data = UseContractQuery()


const state = useRef(data?.nftMetadata)


return (
    <>
      <NavBar />
      <div className={styles.userProfileWrapper}>

       {account &&
       state?.current?.map((data: any) => (
         <Link key={data?.id} href={`/userProfile/${data?.id}`}>
           <div  className={styles.nftCard}>
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

export default UserProfile
