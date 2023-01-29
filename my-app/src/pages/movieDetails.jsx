import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from "../utils/constants";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(movieResponse.data);
        setGenres(movieResponse.data.genres);

        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        setCast(castResponse.data.cast);
  
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        setVideo(videoResponse.data.results[0]);

        // const reviewResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
        // setRating
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {video && (
        <iframe
          className="trailer"
          title={`${movie.title}`}
          src={`https://www.youtube.com/embed/${video.key}?rel=0`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      <div className="row mt-5">
        <div className="col-4">
        <img className="w-100 ms-4"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              
            />
        </div>
        <div className="col-8">
        <div className="details position-absolute">
        <h2 className="fs-1 m-4" style={{ zIndex: "7", color: "#FFF0C8" }}>
          {movie.title}
        </h2>
        <h6 className="overview ms-4 mt-4 me-5" style={{textAlign: "justify", lineHeight:'1.7'}}>{movie.overview}</h6>
        <h6 className="overview ms-4 mt-3 me-5 d-flex">
            <p className="me-2 trailer-link">Genres : </p>
            {genres.length ? genres.map(genre => genre.name).join(", ") : 'No genres available'}
        </h6>
        <h6 className="overview ms-4 mt-2 me-5 d-flex">
            <p className="me-2 trailer-link">Cast : </p>
            {cast.length > 0 ? cast.slice(0, 4).map(c => c.name).join(", ") : 'No cast information available'}
        </h6>
        <h6 className="overview ms-4 mt-2 me-5 d-flex">
            <p className="me-2 trailer-link">Rating : </p>
            {Math.round(movie.vote_average)} / 10
            <p className="ms-2 text-light">( {(movie.vote_count/1000).toFixed(2)}k votes )</p>
        </h6>
      </div>
        </div>
      </div>
    </div>
  );
}


export default MovieDetails;