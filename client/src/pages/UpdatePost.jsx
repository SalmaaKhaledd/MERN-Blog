import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {TextInput,  Select, FileInput, Button, Alert } from 'flowbite-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { set } from 'mongoose';







export default function UpdatePost() {
  const [file, setFile] =useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  console.log(`form data`, formData);


  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
         if (data.posts && data.posts[0]) {
        setFormData(data.posts[0]);
        setPublishError(null);
      }
      };
      fetchPost();
    } catch (error) {
      console.log(error.message);
    }
  }, [postId]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${postId}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  

  const handleUploadImage =async () => {
    const formData2 = new FormData();
    formData2.append('image', file);
    setImageFileUploading(true);
    try{
      if(!file){
        setImageFileUploading(false);
        setImageFileUploadError('Please select an image');
        return;
      }
      setImageFileUploadError(null);
      const res = await fetch('https://api.imgbb.com/1/upload?key=c5c3f939408919a55b31b862ea9877f2', {
      method: 'POST',
      body: formData2,
    });
    const result = await res.json();
    if (result.success) {
      // Get the image URL from the response
      setImageFileUploading(false);
      setImageFileUploadError(null);
      setFormData({...formData, image: result.data.url});
    }
  }
    catch(err){
      setImageFileUploadError('Image Upload Failed');
      setImageFileUploading(false);
      console.error(err); 
  }
}
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update Post</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select 
          onChange={(e) => setFormData({ ...formData, category: e.target.value }) }
          value={formData.category} >
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='reactjs'>React.js</option>
            <option value='nodejs'>Node.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageFileUploading}
          >
            {imageFileUploading ? 'Loading...' : 'Upload Image'}
          </Button>
        </div>
        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}
        {formData.image && (
          <div className="">
          <img src={formData.image} alt='upload' className='w-full h-72 object-cover' /></div>)
          
        }
        <ReactQuill theme='snow' placeholder='Write something...'  className='h-72 mb-12'  required 
        onChange={(value) => {
            setFormData({ ...formData, content: value });
          }} 
          value={formData.content} />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Update Post
        </Button>
        {publishError && (
          <Alert className='mt-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}