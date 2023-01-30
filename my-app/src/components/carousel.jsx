import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';

import { API_KEY } from '../utils/constants';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
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

  const overview = movies.length && movies[activeIndex] && movies[activeIndex].overview && typeof movies[activeIndex].overview === 'string' ? movies[activeIndex].overview.slice(0, 100) + '...' : null;

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  }

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error.message}</p>
  }

  return (
    <div className='row g-0'>
      <div className='col-xl-8 carousel col-12'>

      <style>
        {`
          .carousel .carousel-control-prev,
          .carousel .carousel-control-next {
            display: none;
          }

          @media (min-width: 768px) {
            .carousel .carousel-control-prev,
            .carousel .carousel-control-next {
              display: block;
              margin-top: 25%;
            }
          }
        `}
      </style>

      <Carousel activeIndex={activeIndex} onSelect={handleSelect} indicators={false} interval={8000}>
        {movies.map(movie => (
          <Carousel.Item key={movie.id}>
            <Link to={`/movie/${movies[activeIndex].id}`}>
            <img
              className="d-block w-100"
              src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
              alt={movie.title}
            />
            </Link>
  <div>
      <p className='title pe-4 fs-4 m-4 d-xl-none'>{movies.length ? <p>{movies[activeIndex].title}</p> : null}</p>
    <p className='overview ms-4 pe-4 mb-4 me-4 d-xl-none'>{movies.length ? <p>{overview}<Link to={`/movie/${movies[activeIndex].id}`} className='ms-4 trailer-link'>Know More</Link></p> : null}</p>
      </div>
            </Carousel.Item>
        ))}
      </Carousel>

      <div className="d-flex mt-3 justify-content-center">
          {movies.map((_, index) => (
                        <div
              key={index}
              className={`d-flex justify-content-center mb-4 align-items-center rounded-circle m-1 ms-md-2 me-md-2 ${
                index === activeIndex ? "text-white bg-secondary" : "bg-dark"
              }`}
              style={{ width: "0.9vh", height: "0.9vh" }}
              onClick={() => handleSelect(index)}
            ></div>
          ))}
        </div>
    </div>

  <div className="col-xl-4 d-none d-xl-block text-white">
    <div>
      <h1 className='index mb-5 justify-content-center trailer-link'>{activeIndex + 1}</h1>
      <p className='title ms-4 pe-5 me-4 d-flex'>{movies.length ? <p>{movies[activeIndex].title}</p> : null}</p>
    <p className='overview ms-4 pe-5 me-4'>{movies.length ? <p>{overview}<Link to={`/movie/${movies[activeIndex].id}`} className='ms-4 trailer-link'>Know More</Link></p> : null}</p>
      </div>
  </div>
    </div>
  );
}

export default MovieCarousel;
