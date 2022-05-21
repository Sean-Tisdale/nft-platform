import NavBar from "components/navBar/NavBar"
import  {UseContractQuery}  from "lib/hooks/useContractQuery"
import { useRouter } from "next/router"
import styles from  "styles/pageStyles/dynamicPageStyles.module.css"


function UserPageDetails() {

  const router = useRouter()
  const query = router.query

const token_id = query?.id?.toString() 

const data = UseContractQuery()

const currentNft = data?.nftMetadata?.find(e => e?.id === token_id) 

return (
  <>
  <NavBar />
  <div className={styles.aboutPageWrapper} >
      <div className={styles.cardWrapper} >
      <div className={styles.nftCard} >
          <img src={currentNft?.image} className={styles.nftDisplay} />
            <div className={styles.nftTitle} >
             {currentNft?.name}
            </div>
            </div>
            <div className={styles.nftOwner} >Owned by: {currentNft?.owner}</div> 
            </div>
            <div className={styles.nftInfoWrapper} >
            <div className={styles.descriptionAndTokenId} >Token ID: {currentNft?.id}</div>  
            <div className={styles.descriptionAndTokenId} >Description: {currentNft?.description}</div>           
           <div className={styles.nftContract} >Contract Address: {currentNft?.address}</div>
           </div>           
  </div>
  </>
)
}

export default UserPageDetails