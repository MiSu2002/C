import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import { API_KEY } from '../utils/constants';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [youtubeVideoKey, setYoutubeVideoKey] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(res => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${API_KEY}&type=trailer`)
        .then(res => {
          const youtubeVideos = res.data.results.filter(video => video.site === 'YouTube');
          setYoutubeVideoKey(youtubeVideos[0].key);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedMovie]);

  const overview = movies.length && movies[activeIndex] && movies[activeIndex].overview && typeof movies[activeIndex].overview === 'string' ? movies[activeIndex].overview.slice(0, 150) + '...' : null;


  const handleClick = (movie) => {
    setSelectedMovie(movie);
  }

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
    setYoutubeVideoKey(null);
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='row g-0'>
      <div className='col-xxl-8 carousel col-12'>
      <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false} interval={6000}>
        {movies.map(movie => (
          <Carousel.Item key={movie.id}>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
              onClick={() => handleClick(movie)}
            />
            </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex mt-3 justify-content-center">
          {movies.map((_, index) => (
                        <div
              key={index}
              className={`d-flex justify-content-center mb-4 align-items-center rounded-circle m-2 ${
                index === activeIndex ? "text-white bg-secondary" : "bg-dark"
              }`}
              style={{ width: "12px", height: "12px" }}
              onClick={() => handleSelect(index)}
            ></div>
          ))}
        </div>

        {selectedMovie && movies[activeIndex] === selectedMovie && (
        <div className='m-4 d-block d-xxl-none'>
        <h2 className='text-light'>{movies[activeIndex].title}</h2>
        <div className="d-flex">
        {youtubeVideoKey &&  (
          <a href={`https://www.youtube.com/watch?v=${youtubeVideoKey}`} className='trailer-link text-decoration-none' target="_blank" rel="noopener noreferrer">
            Watch Trailer
          </a>
        )}
        <p className='trailer-link ms-3 me-3'> | </p>
        <Link to='/movie-details' className='trailer-link text-decoration-none'>View More</Link>
        </div>
        <div className="extra-details d-block d-xxl-none">
    </div>
      </div>
        )}
    </div>

  <div className="col-xxl-4 col-12 text-white">
    <div>
      <h1 className='index mb-5 justify-content-center trailer-link'>{activeIndex + 1}</h1>
      <p className='title ms-4 d-flex fs-2'>{movies.length ? <p>{movies[activeIndex].title}</p> : null}</p>
    <p className='overview ms-4'>{movies.length ? <p>{overview}<Link to='/movie-details' className='ms-4 trailer-link'>Know More</Link></p> : null}</p>
      </div>
  </div>
    </div>
  );
}

export default MovieCarousel;
