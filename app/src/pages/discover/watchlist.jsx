import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WatchList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/watchlist');
      setMovies(result.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Watch List</h1>
      {movies.map(movie => (
        <div key={movie._id}>
          <h2>{movie.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default WatchList;
