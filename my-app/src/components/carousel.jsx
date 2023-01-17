import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

import { API_KEY } from '../utils/constants';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [youtubeVideoKey, setYoutubeVideoKey] = useState(null);

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
      .then(res => {
        setMovies(res.data.results);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      axios.get(`https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${API_KEY}&language=en-US`)
        .then(res => {
          const youtubeVideos = res.data.results.filter(video => video.site === 'YouTube');
          setYoutubeVideoKey(youtubeVideos[0].key);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedMovie]);

  const handleClick = (movie) => {
    setSelectedMovie(movie);
  }

  return (
    <div>
      <Carousel>
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
      
      {selectedMovie && (
        <div>
          <h2>{selectedMovie.title}</h2>
          {youtubeVideoKey && (
            <a href={`https://www.youtube.com/watch?v=${youtubeVideoKey}`} target="_blank" rel="noopener noreferrer">
              Watch Trailer
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default MovieCarousel;

