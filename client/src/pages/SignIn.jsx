import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
//to use redux actions in a functional component we use the useDispatch hook
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { set } from 'mongoose'

import OAuth from '../components/OAuth.jsx'


function SignIn() {
  const [formData, setFormData] =useState({})
  //to access the state in the store we use the useSelector hook 
  const {loading, error: errorMessage} = useSelector((state) => state.user)

  //for error handling and loading
  //const [errorMessage, setErrorMessage] = useState(null)
  //const [loading, setLoading] = useState(false)

  //to change application's data an action is dispatched to the store
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleChange = (e) => {
    //...formData is a spread operator that copies the existing formData
   setFormData({...formData, [e.target.id]: e.target.value.trim()}) 
  }
  const handleSubmit = async(e) => {

    e.preventDefault();
    if(!formData.email || !formData.password){
      //return setErrorMessage('Please fill in all the fields.');
      return dispatch(signInFailure('Please fill in all the fields.'));
    }
  
    
    try{
      dispatch(signInStart());
      //fetch sending request to api using api endpoint and method beside optional parameters
      const res= await fetch('/api/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) //convert the object to a string to be sent to the server 
      });

      
      const data= await res.json();
      if(data.success ===false){
        //return setErrorMessage(data.message)
        dispatch(signInFailure(data.message));
      }
      //setLoading(false);
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/')
      }
    }
    catch(error){
      //error in client side
      dispatch(signInFailure(error.message));
      //setLoading(false);
    
    }

  }
  

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
      {/*left side */}
        <div className="flex-1">
          <Link to='/' className=' font-bold dark:text-white text-4xl'>
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
          Salma's
        </span>
        Blog
        </Link>
        <p className='text-sm mt-5'>
          Sign in to get the latest updates. You can sign in with your email and password or with Google.
        </p>
        </div>
      {/*right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email' onChange={handleChange}/>
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput
                type='password'
                placeholder='*********'
                id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-23'>Loading...</span>
                  </>
                  
                ) : 'Sign In'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }

        </div>
      </div>

      
    </div>
  )
 
}

export default SignIn
