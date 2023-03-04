import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';
import { API_KEY } from '../../utils/constants';
import SignIn from '../signIn';

function Recommended() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setIsSignedIn(true);
        } else {
          setIsSignedIn(false);
        }
      });
  
      return unsubscribe;
    }, []);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&language=en-US&sort_by=TopRatedity.desc&include_adult=false&include_video=false`
        );
        const data = await response.json();
        const trendingMovies = data.results.slice(0,15);
        const recommendedMoviesArray = [];
  
        for (const movie of trendingMovies) {
          const recommendedResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.id}/recommendations?api_key=${API_KEY}&language=en-US&sort_by=TopRatedity.desc&include_adult=false&include_video=false`
          );
          const recommendedData = await recommendedResponse.json();
          const recommendedMovies = recommendedData.results.slice(0,25);
  
          recommendedMoviesArray.push({
            recommendedMovies: recommendedMovies.map((recommendedMovie) => ({
              title: recommendedMovie.title || recommendedMovie.name,
              image: `https://image.tmdb.org/t/p/w500/${recommendedMovie.poster_path}`,
              vote_average: recommendedMovie.vote_average,
            })),
          });
        }
  
        setRecommendedMovies(recommendedMoviesArray);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchTrendingMovies();
  }, []); 

  return (
    <div>
        {isSignedIn ? (
            <div>
            <Navbar/>
            <h3 className="m-4 mt-xl-5 ms-lg-5 text-center text-lg-start trailer-link" style={{fontFamily: 'Montserrat'}}>
              Recommendations for {firebase.auth().currentUser.displayName}
              </h3>
          <div className="d-flex flex-wrap mb-5">
          <ul>
            {recommendedMovies.map((movie) => (
      <ul className='d-flex flex-wrap justify-content-center p-0'>
        {movie.recommendedMovies.map((recommendedMovie) => (
          recommendedMovie.image && recommendedMovie.title && (
          <li key={recommendedMovie.title} className='me-5 mt-5'>
            <img src={recommendedMovie.image} alt={recommendedMovie.title} style={{width:'220px', height: '320px'}}/>
            <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'220px'}}>{Math.round((recommendedMovie.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
            <p className='movie-title me-4 text-white fw-bolder mt-1 text-center' style={{width:'220px', fontFamily:"Poppins"}}>{recommendedMovie.title}</p>
          </li>
        )))}
      </ul>
    ))}
    
          </ul>
          </div>
    
            {/* Footer component */}
            <Footer/>
    
        </div>
        ) : <SignIn/>}
    </div>
  );
}

export default Recommended; 