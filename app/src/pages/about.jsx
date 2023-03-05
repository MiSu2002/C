import React from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';

function About() {

  return (
    <div>
        <Navbar/>
      <div className="mt-5 about text-white mb-5 p-3 p-lg-5">
      <style>
    {`
    .about{
        z-index: 9;
    width: 90%;
    font-family: Montserrat;
    margin-left: 5%;
    line-height: 2.3; 
    background-color: rgb(50,50,80, 0.5);
    border-radius: 5px;
    }

    @media screen and (min-width: 1200px) {
        .about{
            margin-left: 15%;
            width: 70%;
        }
    }
    `}
</style>
        <h3 className='mb-5 justify-content-center justify-content-xl-start d-flex trailer-link'>About Cinèra :</h3>
        <p>Cinèra is an online movie or shows database that contains information and statistics about movies and shows. </p>
        <p className='mt-4' style={{color: 'rgb(0,200,150)'}}>What can you do using Cinèra :</p>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>Have a particular name in mind? Search for movies or shows from Cinèra database.</p>
        </div>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>Don't have a particular name in mind? No worries! You can discover movies or shows from different categories like Popular Now, Trending Recently, Ongoing Shows, Top Rated Movies or Shows and more.</p>
        </div>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>Click on the image of the movie or show of your choice to get the details about it.</p>
        </div>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>The details contain the information about the title, cast, director, genres, language, trailer and more.</p>
        </div>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>Watched a movie or show and liked it? Want to get similar movies or recommended movies based on it? Get similar movies or shows like the one that you liked in the details section of it.</p>
        </div>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>Don't want to go through all the hustle to find a good movie or show? Try Cinèra's recommendations section that updates everyday based on what's trending nowadays.</p>
        </div>
        <div className="d-flex">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>-</p>
        <p>To view the details of movie or show or to explore the Discover section : </p>
        </div>
        <div className="d-flex mt-3">
            <p className='me-2' style={{color: 'rgb(100,100,255)'}}>{'>>>'}</p>
        <p><Link to='/signin' style={{color: 'rgb(0,200,150)'}}>Login Now</Link> to get started! If already logged in, experience with Cinèra.</p>
        </div>
      </div>
    </div>
  );
};

export default About;