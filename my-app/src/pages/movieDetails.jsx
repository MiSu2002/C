import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import arrow from '../assets/icons/right-arrow.png';
import { API_KEY } from "../utils/constants";

function MovieDetails() {
  // Destructure the id from the URL parameters
  const { id } = useParams();

  // State variables to store movie details, video, genres, like and cast
  const [movie, setMovie] = useState({});
  const [video, setVideo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastIndex = currentIndex + 8 >= cast.length;
  const isFirstIndex = currentIndex <= 0;

  // Use effect to fetch the data for movie details, video, genres and cast
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(movieResponse.data);
        setGenres(movieResponse.data.genres);

        // Fetch movie cast
        const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
        setCast(castResponse.data.cast);
        setDirector(castResponse.data.crew.find(member => member.job === 'Director').name);

        // Fetch movie video
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailer = videoResponse.data.results.find((video) => video.type === "Trailer");
        setVideo(trailer ? trailer : videoResponse.data.results[0]);

        // Uncomment if movie review is needed
        // const reviewResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
        // setRating
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]); // Re-run the effect only when the id changes

  // This function toggles the state of the like button between liked and not liked
  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const handleClicked = () => {
    setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 8);
  }

  const handleClickedBack = () => {
    setCurrentIndex(prevCurrentIndex => prevCurrentIndex - 8);
  }

  return (
    <div>
      {/* Display the movie trailer if it is available */}
      {video && (
        <iframe
          className="trailer"
          title={`${movie.title}`}
          src={`https://www.youtube.com/embed/${video.key}?rel=0`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in- picture"
          allowFullScreen
        />
      )}
      
      <div className="details" style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`}}>

      <div className="row">
        <div className="col-4 mt-4 mt-xl-5 mb-4 mb-xl-5" style={{zIndex: '9'}}>

        {/* Display the movie poster */}
        <img className="details-img d-flex"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
        </div>

        <div className="col-8 mt-4 mt-xl-5 ps-2" style={{zIndex: '9'}}>

          <div className="d-flex" style={{width: '85%'}}>

            <div className="col-8 col-lg-10">
              {/* Movie title */}
          <h2 className="fs-1 ms-4 me-4" style={{ zIndex: "7", color: "#FFF0C8", fontFamily:'Montserrat'}}>
            {movie.title}
          </h2>
            </div>
          
          <div className="col d-flex justify-content-end">
            {/* Like button to like the movie */}
          <svg viewBox="0 0 512 512" onClick={handleClick} className='mt-2 likeButton'>
            <path 
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" 
            fill={isLiked ? "pink" : "white"}
            style={isLiked ? { opacity: '1' } : { opacity: '0.3' }}
            />
          </svg>
          </div>

          </div>


          {/* Overview of movie */}
          <h6 className="text-white ms-4 mt-2 mt-xl-4" style={{textAlign: "justify", lineHeight:'1.7', width:'80%', fontWeight: '900'}}>
            {movie.overview}
          </h6>

          {/* Display movie genres */}
          <h6 className="text-white ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Genres: </p>
            {genres.length ? genres.map(genre => genre.name).join(", ") : 'No genres available'}
          </h6>

          {/* Display movie director */}
          <h6 className="text-white ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Director: </p>
            {director}
          </h6>
          
          {/* Display movie cast */}
          <h6 className="text-white ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Cast: </p>
            {cast.length > 0 ? cast.slice(0, 4).map(c => c.name).join(", ") : 'No cast information available'}
          </h6>
          
          {/* Display movie rating */}
          <h6 className="text-white ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Rating: </p>
            {Math.round(movie.vote_average)} / 10
            <p className="ms-2 text-light">( {(movie.vote_count/1000).toFixed(2)}k votes )</p>
          </h6>
        </div>
  </div>

  <h3 className="mt-4 ms-4 text-white position-relative" style={{fontFamily: 'Montserrat', zIndex:'9'}}>Cast :</h3>

  <div className="trending-slider-sm m-4 position-relative">
  {cast.map((actor, index) => (
    actor.profile_path ? (
      <div className="me-4" style={{zIndex: '9'}}>
      <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:'17vw', height:'22vw',borderRadius:'1vh'}}/>
    <div className="card-body mt-1" style={{width: '17vw'}}>
      <h5 className="movie-title fw-bolder text-white text-center" style={{fontSize: '1.6vw'}}>{actor.name}</h5>
      <p className="card-text liked text-center" style={{fontSize: '1.5vw'}}>{actor.character}</p>
    </div>
      </div>
  ) : null
))}
    </div>

    <div className="trending-slider m-4">
  {cast.slice(currentIndex, currentIndex + 7).map((actor, index) => (
    actor.profile_path ? (
        <div className="me-5" style={{zIndex: '9'}}>
          <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:'8vw', height:'11vw',borderRadius:'1vh'}}/>
        <div className="card-body mt-1" style={{width: '8vw'}}>
          <h5 className="movie-title fw-bolder text-white text-center" style={{fontSize: '0.7vw'}}>{actor.name}</h5>
          <p className="card-text liked text-center" style={{fontSize: '0.7vw'}}>{actor.character}</p>
        </div>
          </div>
    ) : null
  ))}
  { !isFirstIndex && 
      <button style={{border: 'none', backgroundColor: 'transparent', marginTop:'-20%', zIndex:'9'}} onClick={handleClickedBack}>
        <img src={arrow} className='arrow position-absolute me-3 me-md-5 p-3' style={{marginTop:'4.5%', rotate: '180deg'}} alt='slide back'/>
      </button>
}
      { !isLastIndex && 
        <button style={{border: 'none', backgroundColor: 'transparent', marginTop:'-20%', zIndex:'9'}} onClick={handleClicked}>
        <img src={arrow} className='arrow position-absolute me-3 me-md-5 p-3' style={{marginTop:'10.5%'}} alt='slide next'/>
        </button>}

</div>

      </div>
</div>

  );
}

export default MovieDetails;