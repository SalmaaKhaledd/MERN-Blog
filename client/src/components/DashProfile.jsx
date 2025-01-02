import { TextInput,Button } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { set } from 'mongoose';
import { use } from 'react';


export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl,setImageFileUrl] = useState(null);  
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file= e.target.files[0];  
    if(file){
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
    e.target.value = null;
 }
  useEffect(() => {
    if(imageFile){
      uploadImage();
    }} ,[imageFile]);
  const uploadImage = async () => { 
    setImageFileUploadError(null);
    const formData = new FormData();
    formData.append('image', imageFile);
    try {

    const response = await fetch('https://api.imgbb.com/1/upload?key=c5c3f939408919a55b31b862ea9877f2', {
      method: 'POST',
      body: formData,
    });
    const result = await response.json();
    if (result.success) {
      // Get the image URL from the response
      setImageFileUrl(result.data.url);
    } else {
      setImageFileUploadError('Could not upload image');
    }
  }catch (error) {
    setImageFileUploadError('Error uploading image');
  }
}

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        {/* file picker is hidden and is triggered by clicking on the image using useRef() */}
        <input type="file" accept='image/*, .heic' onChange={handleImageChange}  hidden ref={filePickerRef} />
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePicture} alt="user"  className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/> 
          </div>
        <TextInput type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username}/>
        <TextInput type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email}/>
        <TextInput type='password' id='password' placeholder='password'/>
        <Button type='submit' gradientDuoTone='purpleToPink' outline>Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

