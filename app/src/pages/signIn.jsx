import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { Link, Navigate } from 'react-router-dom';
import { API_KEY } from '../utils/constants';
import Navbar from '../components/navbar';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    async function fetchTrendingMedia() {
      try {
          const response = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
          const data = await response.json();
          console.log('data:', data);
          const backgroundImageUrl = window.matchMedia("(min-width: 1000px)").matches 
            ? `https://image.tmdb.org/t/p/original/${data.results[0].backdrop_path}`
            : `https://image.tmdb.org/t/p/original/${data.results[0].poster_path}`;
            console.log('backgroundImageUrl:', backgroundImageUrl);
            setBackgroundImage(backgroundImageUrl);
        } catch (error) {
          console.log(error);
      }
    }

    fetchTrendingMedia();
  }, []);

  const handleSignIn = async () => {
    try {
      const result = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(result.user);
      setIsSignedIn(true);
      setRedirectToHome(true); // set redirect to true
    } catch (error) {
      // handle error
      console.log(error.code);
      switch (error.code) {
        case 'auth/user-not-found':
          setErrorMessage('User not found');
          break;
        case 'auth/wrong-password':
          setErrorMessage('Email/password is not correct');
          break;
        default:
          setErrorMessage(error.message);
      }
    }
  };

  if (redirectToHome) {
    return (
      <>
        <Navbar isSignedIn={isSignedIn} className="d-none"/>
        <Navigate to="/" />
        {isSignedIn ? 2 : 6}
      </>
    );
  }
  

  return (
    <div className='signup' style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="nav d-flex position-relative mt-3" style={{zIndex: '9'}}>
        <h1 className='text-white col ms-3 ms-lg-4' style={{fontFamily: 'Poppins'}}>CINÈRA</h1>
        <Link to='/' className='trailer-link d-flex justify-content-end me-3 me-lg-4 mt-1 mt-lg-2 mt-xl-3'>
            <p style={{fontFamily: 'Forum'}}>Continue as Guest</p>
        </Link>
        </div>
      <div className="register mx-auto position-fixed">
        <h2 className='mb-5 justify-content-center d-flex text-warning fw-bold'>Login</h2>
          <div style={{fontFamily: 'Forum'}}>
          {errorMessage && <p style={{color: 'rgb(255,100,10)'}}>{errorMessage}</p>}
          <input className='d-flex w-100 mb-3 form-control' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className='me-4 d-flex mb-3 justify-content-center form-control' style={{width: '48%'}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-flex mt-4">
          <button className='btn btn-warning me-4 h-50' onClick={handleSignIn}>Sign In</button>
          <p className='me-4 text-light position-relative mt-2'>/</p>
          <button className='btn btn-secondary h-50' onClick={() => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
          console.log(result.user);
          setRedirectToHome(true); // set redirect to true
        }).catch((error) => {
          // handle error
          console.log(error.message);
          setErrorMessage(error.message);
        });
      }}>Sign in with Google</button>
          </div>
          <div className='d-flex mt-4'>
          <p className='text-white me-2'>Not registered?</p>
          <Link to='/register' style={{color: '#FA9'}}>Register Now</Link>
          </div>
      </div>
    </div>
  );
};

export default SignIn;