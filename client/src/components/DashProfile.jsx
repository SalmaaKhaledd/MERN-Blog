import { TextInput,Button, Alert } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { updateStart,updateSuccess, updateFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { set } from 'mongoose';
import { use } from 'react';


export default function DashProfile() {
  const {currentUser} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl,setImageFileUrl] = useState(null);  
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
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
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const formData2 = new FormData();
    formData2.append('image', imageFile);
    try {

    const response = await fetch('https://api.imgbb.com/1/upload?key=c5c3f939408919a55b31b862ea9877f2', {
      method: 'POST',
      body: formData2,
    });
    const result = await response.json();
    if (result.success) {
      // Get the image URL from the response
      setImageFileUrl(result.data.url);
      setFormData({...formData, profilePicture: result.data.url});
      setImageFileUploading(false);
    } else {
      setImageFileUploadError('Could not upload image');
      setImageFileUploading(false);
    }
  }catch (error) {
    setImageFileUploadError('Error uploading image');
    setImageFileUploading(false);
  }
}

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value});
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if(Object.keys(formData).length === 0){
      setUpdateUserError('No changes made');
      return;
    } 
    if(imageFileUploading){
      setUpdateUserError('Please wait for the image to upload');
      return;
    }
    try{
      dispatch(updateStart());
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if(!response.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    }
    catch(error){
     dispatch(updateFailure(error.message));
    }
   
  }


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* file picker is hidden and is triggered by clicking on the image using useRef() */}
        <input type="file" accept='image/*, .heic' onChange={handleImageChange}  hidden ref={filePickerRef} />
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
          <img src={imageFileUrl || currentUser.profilePicture} alt="user"  className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/> 
          </div>
        <TextInput type='text'
          id='username'
          placeholder='username'
          defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email'
          id='email'
          placeholder='email'
          defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='password 'onChange={handleChange}/>
        <Button type='submit' gradientDuoTone='purpleToPink' outline>Update</Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
      {
      updateUserSuccess && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)
      }
      {
      updateUserError && (<Alert color='failure' className='mt-5'>{updateUserError}</Alert>)
      }
    </div>

  )
}

