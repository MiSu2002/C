import React, { useState, useEffect } from 'react';
import arrow from '../icons/right-arrow.png';
import { API_KEY } from "../utils/constants";

const TrendingWeek = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setCurrentIndex(currentIndex + 5);
}

  return (
    <div>
        <div className="text-white mb-5 me-4 me-md-5 d-flex justify-content-end">
        <h2 className='trending-week'>TRENDING THIS WEEK</h2>
        <img src={arrow} className='small-arrow ms-2 ms-lg-3' alt='trending'/>
        </div>
      <div className="d-flex trending-slider me-4 me-md-5">
      {data.slice(currentIndex, currentIndex + 5).map(movie => (
        <div key={movie.id}>
          <img className='ms-4 ms-md-5' style={{width:'15vw'}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
          <p className='liked fw-bolder ms-4 ms-md-5 mt-2 mb-0 text-center'>{Math.round((movie.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='movie-title text-white fw-bolder ms-4 ms-md-5 mt-1 text-center'>{movie.title}</p>
        </div>
      ))}
      <div>
      <button style={{border: 'none', backgroundColor: 'transparent'}} onClick={handleClick}><img src={arrow} className='arrow position-absolute me-3 me-md-4 p-3' alt='slide next'/></button>
      </div>
      </div>
    </div>
  );
};

export default TrendingWeek;