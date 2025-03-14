import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { set } from 'mongoose'
import OAuth from '../components/Oauth'
import { signUpStart,signUpSuccess} from '../redux/user/userSlice'


function SignUp() {
  const [formData, setFormData] =useState({})

  //for error handling and loading
  const [errorMessage, setErrorMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    //...formData is a spread operator that copies the existing formData
   setFormData({...formData, [e.target.id]: e.target.value.trim()}) 
  }
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill in all the fields.');
    }
  
    
    try{
      dispatch(signUpStart());
      setLoading(true);
      

      //fetch sending request to api using api endpoint and method beside optional parameters
      const res= await fetch('/api/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData) //convert the object to a string to be sent to the server 
      });
      const data= await res.json();
      if(data.success ===false){
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if(res.ok){
        dispatch(signUpSuccess(data));
        navigate('/')
      }
    }
    catch(err){
      //error in client side
      setErrorMessage(err.message)
      setLoading(false);
    
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
          Sign up to get the latest updates. You can sign up with your email and password or with Google.
        </p>
        </div>
      {/*right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Username' />
              <TextInput
                type='text'
                placeholder='Username'
                id='username' onChange={handleChange}/> 
            </div>
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
                placeholder='Password'
                id='password' onChange={handleChange}/>
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading? (
                  <>
                  <Spinner size='sm'/>
                  <span className='pl-23'>Loading...</span>
                  </>
                  
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
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

export default SignUp
