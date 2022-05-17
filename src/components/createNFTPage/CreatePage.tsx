import React, { useRef, useState } from 'react'
import NavBar from '../navBar/NavBar'
import createPageStyles from './/CreatePageStyles.module.css'
import { uploadMetadata } from 'lib/hooks/uploadMetadata'
import { useC } from 'lib/hooks/useC'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'

const CreatePage = () => {
  const [imageDisplay, setImageDisplay] = useState<any>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [fileToUpload, setFileToUpload] = useState<File>()
  const { account } = useWeb3React()
  const { mintNft } = useC()

  const inputFile: any = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputFile.current?.click()
  }
  const handleChange = (e: any) => {
    const file = e.currentTarget.files[0]
    setImageDisplay(URL?.createObjectURL(file))
    setFileToUpload(file)
  }

  const handleNameInput = (e: any) => {
    setName(e.target.value)
  }
  const handleDescriptionInput = (e: any) => {
    setDescription(e.target.value)
  }
 
  const handleSubmit = async () => {
    if (account) {
      const data = await uploadMetadata(name, fileToUpload, description) 
      await mintNft(data) 
    } else {
     alert('Please connect wallet')
    }
  }

  return (
    <>
      <NavBar />
      <div className={createPageStyles.pageWrapper}>
        <div className={createPageStyles.title}>Create New NFT</div>
        <input
          type="file"
          ref={inputFile}
          onChange={handleChange}
          style={{ display: 'none' }}
          name="NFT"
          required
        />
        <Image className={createPageStyles.image} src={imageDisplay} />
        <button className={createPageStyles.button} onClick={handleClick}>
          Upload
        </button>
        <label>Add Name</label>
        <input
          className={createPageStyles.input}
          type="text"
          onChange={handleNameInput}
          placeholder="Name Your NFT"
          required
        />
        <label>Add Description</label>
        <input
          className={createPageStyles.input}
          onChange={handleDescriptionInput}
          type="text"
          placeholder="Provide a description"
          required
        />
        <button className={createPageStyles.button} onClick={handleSubmit}>
          Create NFT
        </button>
      </div>
    </>
  )
}

export default CreatePage
