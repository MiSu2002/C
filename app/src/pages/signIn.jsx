import React from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

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

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      console.log(result.user);
      // handle successful sign-in
    } catch (error) {
      // handle error
      console.log(error.message);
      console.log(process.env.REACT_APP_PROJECT_ID);
    }
  };

  return (
    <div>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {process.env.REACT_APP_PROJECT_ID}
    </div>
  );
};

export default SignIn;
