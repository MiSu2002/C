import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { API_KEY } from '../utils/constants';
import { Link } from 'react-router-dom';

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

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState('');
  
    useEffect(() => {
      async function fetchTrendingMedia() {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`);
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

    const handleGoogleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            // Handle successful sign-in
            const user = result.user;
            console.log(user);
          })
          .catch((error) => {
            // Handle errors
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
      };

      const handleGoogleRegister = async () => {
        try {
          await handleGoogleSignIn();
          await handleRegister();
          setIsRegistrationSuccess(true);
        } catch (error) {
          setErrorMessage(error.message);
        }
      }
      
      
  
    const handleRegister = async () => {
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }
      try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        console.log(result.user);
        setIsRegistrationSuccess(true);
      } catch (error) {
        console.log(error.message);
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage('Email address already in use');
            break;
          case 'auth/invalid-email':
            setErrorMessage('Invalid email address');
            break;
          case 'auth/weak-password':
            setErrorMessage('Password is too weak');
            break;
          default:
            setErrorMessage('Registration failed. Try again later.');
            break;
        }
      }
    };
  
    return (
      <div className='signup' style={{backgroundImage: `url(${backgroundImage})`}}>
        <div className="nav d-flex position-relative mt-3" style={{zIndex: '9'}}>
        <h1 className='text-white col ms-3 ms-lg-4' style={{fontFamily: 'Poppins'}}>CINÈRA</h1>
        {!isRegistrationSuccess && (
        <Link to='/' className='trailer-link d-flex justify-content-end me-3 me-lg-4 mt-1 mt-lg-2 mt-xl-3'>
            <p style={{fontFamily: 'Forum'}}>Continue as Guest</p>
        </Link>
        )}
        </div>
      <div className="register mx-auto position-fixed">
      {isRegistrationSuccess ? (
        <div className='w-100 text-center'>
          <p style={{color: 'rgb(100,255,10)'}}>Registration successful! Please sign in to continue.</p>
          <Link to='/signin'>
            <button className='btn btn-success mt-2' onClick={() => setIsRegistrationSuccess(false)}>Sign In</button>
         </Link>
        </div>
      ) : (
        <>
        <h2 className='mb-5 justify-content-center d-flex text-warning fw-bold'>Register Now</h2>
          <div style={{fontFamily: 'Forum'}}>
          {errorMessage && <p style={{color: 'rgb(255,100,10)'}}>{errorMessage}</p>}
          <input className='d-flex w-100 mb-3 form-control' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <div className="d-flex mb-3 justify-content-center">
            <input className='me-4 form-control' style={{width: '48%'}} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input className='form-control' style={{width: '48%'}} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </div>
          </div>
          <div className="d-flex mt-4">
          <button className='btn btn-warning me-4 h-50' onClick={handleRegister}>Register</button>
          <p className='me-4 text-light position-relative mt-2'>/</p>
          <button className='btn btn-secondary h-50' onClick={handleGoogleRegister}>Register with Google</button>
          </div>
          <div className='d-flex mt-4'>
          <p className='text-white me-2'>Already registered?</p>
          <Link to='/signin' style={{color: '#FA9'}}>Sign in</Link>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default Register;