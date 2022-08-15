import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';
import UserContext from '../context/user';

// useHistory allows user to navegate else where

export default function SignUp() {
  const navigate = useNavigate();
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);
  
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(true);
  const isInvalid = emailAddress === '' || password === '' || username === '' || fullName === '';

  const handleSignup = async (e) => {
    e.preventDefault();

    if(user) {
      navigate(ROUTES.DASHBOARD);
    }

    const usernameExists = await doesUsernameExist(username);
    if(!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        const newUser = {
          userId: createdUserResult.user.uid,
          username: username.toLowerCase(),
          fullName: fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          followers: [],
          dateCreated: Date.now()
        }

        const ad = await firebase
          .firestore()
          .collection('users')
          .add(newUser)
          .then(() => navigate(ROUTES.DASHBOARD));
       
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError('The username is already taken, please try another.')
    }
  }

  useEffect(() => {
    // Instagram uses Iniciar Sessao, but I would have to tranlate it, maybe add this functionality that changes text according to langauge of the user
    document.title = 'Sign Up • Postagram'
  }, [])

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img src="/images/iphone-with-profile.jpg" alt='iPhone image'/>
      </div>
      <div className='flex flex-col w-2/5'>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary rounded mb-4'>
          <h1 className='flex justify-center w-full'>
            <img src="/images/logo (2).png" alt="Postagram logo" className='mt-2 w-6/12 mb-4'/>
          </h1>

          {error && <p className='text-center mb-4 text-xs text-red-primary'>{error}</p>}

          <form onSubmit={handleSignup} method='POST'>
            <input aria-label='Enter your email address' aria-required='true' type='email' placeholder='Email address' className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' onChange={({target}) => setEmailAddress(target.value)} value={emailAddress} />

            <input aria-label='Enter your full name' aria-required='true' type='text' placeholder='Full Name' className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'  onChange={({target}) => setFullName(target.value)} value={fullName} />

            <input aria-label='Enter your username' aria-required='true' type='text' placeholder='Username' maxLength={30} className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' onChange={({target}) => setUsername(target.value)} value={username} />

            <input aria-label='Enter your password' aria-required='true' type='password' placeholder='Password' className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2' onChange={({target}) => setPassword(target.value)} value={password}/>

            <button disabled={isInvalid} type='submit' 
            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>
              Sign Up
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary rounded'>
          <p className='text-sm'>Have an account?{` `}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
