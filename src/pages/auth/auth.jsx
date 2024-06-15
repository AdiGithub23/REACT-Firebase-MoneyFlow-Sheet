import React, { useEffect } from 'react'
// import './auth_styles.css'
import './authStyles.css'
import { auth, provider } from '../../config/firebase.js'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useGetUserInfo } from '../../hooks/useGetUserInfo.js'

const Auth = () => {

  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  useEffect(() => {
    if(isAuth){
      navigate('/expenses')
    }
  })

  const SignInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    // console.log(result)

    // To track the logged in user & to keep the user logged in when reloading.
    const authStringInfo = {
      userID: result.user.uid,
      email: result.user.email,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true
    }
    // localStorage.setItem('auth', authStringInfo.email);
    localStorage.setItem('auth', JSON.stringify(authStringInfo));

    navigate('/expenses')
  }

  return (
    <div className='login-page'>
      <p>Sign In with Google ...</p>
      <button className='login-with-google-btn' onClick={SignInWithGoogle}>{' '}
        Sign In with Google
      </button>
    </div>
  )
}

export default Auth