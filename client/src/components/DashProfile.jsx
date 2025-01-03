import { TextInput,Button, Alert, Modal,ModalBody } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useRef } from 'react';
import { useEffect } from 'react';
import { updateStart,updateSuccess, updateFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi'; 
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { use } from 'react';
import { set } from 'mongoose';



export default function DashProfile() {
  const {currentUser, error, loading} = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl,setImageFileUrl] = useState(null);  
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleDeleteUser = async () => {
    setShowModal(false);
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
        //navigate('/sign-in')
      }else{
        dispatch(deleteUserSuccess(data));
        //navigate('/sign-in');
    }
  }
    catch(error){
       dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      console.log('Response status:', res.status, 'Response data:', data);
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
    };

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
        <Button type='submit' gradientDuoTone='purpleToBlue'  disabled={loading || imageFileUploading} >
            {loading ? 'Loading...' : 'Update'}
        </Button>
        {currentUser.isAdmin && (
          <Link to={'/create-post'}>
            <Button
              type='button'
              gradientDuoTone='purpleToPink'
              className='w-full'
            >
              Create a post
            </Button>
          </Link>
        )}
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=>setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {
      updateUserSuccess && (<Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>)
      }
      {
      updateUserError && (<Alert color='failure' className='mt-5'>{updateUserError}</Alert>)
      }
      {
      error && (<Alert color='failure' className='mt-5'>{error}</Alert>)
      }
      <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete your account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteUser}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>

  )
}

