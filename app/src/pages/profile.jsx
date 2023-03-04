import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import Navbar from '../components/navbar';
import SignIn from './signIn';
import pic from '../assets/images/no-pic.jpeg'
import Footer from '../components/footer';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsSignedIn(true);
        fetchProfilePicUrl(user);
      } else {
        setUser(null);
        setIsSignedIn(false);
        setProfilePicUrl(null);
        setProfilePicFile(null);
      }
    });

    return unsubscribe;
  }, []);

  const fetchProfilePicUrl = async (user) => {
    const storageRef = firebase.storage().ref();
    const picRef = storageRef.child(`users/${user.uid}/profile-pic.jpg`);

    try {
      const url = await picRef.getDownloadURL();
      setProfilePicUrl(url);
    } catch (error) {
      console.log('Profile pic not found');
    }
  }

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      console.log('Please choose an image file');
      return;
    }
    setProfilePicFile(file);
    setProfilePicUrl(URL.createObjectURL(file));
  };

  const handleProfilePicSave = async () => {
    if (!profilePicFile) {
      console.log('Please choose a profile pic');
      return;
    }
    const storageRef = firebase.storage().ref();
    const picRef = storageRef.child(`users/${user.uid}/profile-pic.jpg`);

    try {
      await picRef.put(profilePicFile);
      const url = await picRef.getDownloadURL();
      setProfilePicUrl(url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEmailChange = async (event) => {
    event.preventDefault();
    const newEmail = event.target.elements.email.value;
    try {
      await user.updateEmail(newEmail);
      setUser({...user, email: newEmail});
      alert('Email changed successfully. Please sign in with your new email.');
      firebase.auth().signOut();
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    const newPassword = event.target.elements.password.value;
    try {
      await user.updatePassword(newPassword);
      alert('Password updated successfully.');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEmailVerification = async () => {
    try {
      await user.sendEmailVerification();
      alert('Verification email sent');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
        {isSignedIn ? (
            <div>
            <Navbar/>
              <div className="text-center position-relative" style={{marginTop: '11.5vh'}}>
              <h2 className='text-white d-flex justify-content-center'>Welcome,
              <p className='trailer-link ms-2'>{user.displayName}</p>!
              </h2>
              {profilePicUrl ? (
  <img
    className='mt-3 mb-3'
    src={profilePicUrl}
    alt='Profile pic'
    style={{
      width: '200px',
      marginLeft: '17vh',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '50%',
      border: '2px solid black',
      cursor: 'pointer',
    }}
    onClick={() => document.getElementById('profile-pic-upload').click()}
    onError={(e) => {
      e.target.src = 'default_profile_pic.png'; // Replace with your default profile picture URL
    }}
  />
) : (
  <img
    className='mt-3 mb-3'
    src={pic}
    alt='Default profile pic'
    style={{
      width: '200px',
      marginLeft: '17vh',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '50%',
      border: '2px solid black',
      cursor: 'pointer',
    }}
    onClick={() => document.getElementById('profile-pic-upload').click()}
  />
)}
              <input
                id='profile-pic-upload'
                type='file'
                accept='image/*'
                onChange={handleProfilePicUpload}
                style={{ display: 'none' }}
              />
              <button className='btn btn-dark btn-sm ms-5' onClick={handleProfilePicSave}>Save Profile Pic</button>
              <div className="d-flex justify-content-center text-white mt-5" style={{marginLeft: '14vh'}}>
              <h5 className='trailer-link me-2 mt-1'>Email :</h5>
              <h5 className='mt-1'>{user.email}</h5>
              <div className="text-secondary ms-5">
              {user.emailVerified ? (
                <p className='text-success'>Email verified</p>
              ) : (
                <button className='btn btn-dark btn-sm' onClick={handleEmailVerification}>Verify Email</button>
              )}
              </div>
              </div>
              <form onSubmit={handleEmailChange}>
                <div className='d-flex justify-content-center mt-4' style={{marginLeft: '13vh'}}>
                  <input className='form-control me-5' style={{height: '30px', width: '275px', fontSize: '15px'}} type="email" name="email" placeholder='Change Email address'/>
                  <button type="submit" className="btn btn-sm btn-dark" style={{width: '8vh', height: '3.3vh', marginTop: '-0.2vh'}}>Change</button>
                </div>
              </form>
              <form onSubmit={handlePasswordChange}>
                <div className='d-flex justify-content-center mt-4' style={{marginLeft: '13vh'}}>
                  <input className='form-control me-5' style={{height: '30px', width: '275px', fontSize: '15px'}} type="password" name="password" placeholder='Change Password'/>
                  <button type="submit" className="btn btn-sm btn-dark" style={{width: '8vh', height: '3.3vh', marginTop: '-0.2vh'}}>Change</button>
                </div>
              </form>
              <p className='text-secondary' style={{marginTop: '10vh'}}>Last sign-in: {user.metadata.lastSignInTime}</p>
              </div>
              <div style={{marginTop: '10vh'}}></div>
              <Footer/>
              </div>
        ) : <SignIn/>}
    </div>
  );
};

export default Profile;
