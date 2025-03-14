import { Button } from 'flowbite-react'
import React from 'react'
import { AiFillGoogleCircle } from 'react-icons/ai'
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch } from 'react-redux'   
import { signInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'


export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async() => {
    const provider = new GoogleAuthProvider()
    //allows user to select account every time they sign in
    provider.setCustomParameters({prompt: 'select_account'})
    try{
      const resultsFromGoogle = await signInWithPopup(auth, provider)
      const res= await fetch('/api/auth/google',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName, 
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        })//convert the object to a string to be sent to the server 
      });

      //convert the response to json
      const data=await res.json();
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
     } catch(err){
      console.error(err)
    }

  } 
  return (
   <Button type='button' gradientDuoTone='pinkToOrange' outline onClick={handleGoogleClick}>
        <AiFillGoogleCircle className='w-6 h-6 mr-2'/>
        Continue with Google
    </Button>
  )
}
