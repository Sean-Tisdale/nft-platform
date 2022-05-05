import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../navBar/NavBar'
import createPageStyles from './/CreatePageStyles.module.css'
import { uploadMetadata } from 'lib/hooks/uploadMetadata'

const CreatePage = () => {
  const [imageDisplay, setImageDisplay] = useState<any>()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [fileToUpload, setFileToUpload] = useState<File>()

  const inputFile: any = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputFile.current?.click()
    console.log(typeof inputFile.current, 'input File')
  }
  const handleChange = (e: any) => {
    const file = e.currentTarget.files[0]
    setImageDisplay(URL?.createObjectURL(file))
    setFileToUpload(file)
    console.log(typeof file, 'file handle change')
  }

  const handleNameInput = (e: any) => {
    setName(e.target.value)
  }
  const handleDescriptionInput = (e: any) => {
    setDescription(e.target.value)
  }
  const handleSubmit = async () => {
    await uploadMetadata(fileToUpload, name, description)
  }

  return (
    <>
      <NavBar />
      <div className={createPageStyles.pageWrapper}>
        <div className={createPageStyles.title}>Create New NFT</div>
        <input
          type="file"
          accept="image/*"
          ref={inputFile}
          onChange={handleChange}
          style={{ display: 'none' }}
          name="NFT"
          required
        />
        <img className={createPageStyles.image} src={imageDisplay} />
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
