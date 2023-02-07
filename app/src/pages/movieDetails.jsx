import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import arrow from '../assets/icons/right-arrow.png';
import { API_KEY } from "../utils/constants";
import { languageCodes } from "../utils/languageCodes";

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
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastIndex = currentIndex + 6 >= cast.length;
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

        const reviewResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`);
        setReviews(reviewResponse.data.results);
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
    setCurrentIndex(prevCurrentIndex => prevCurrentIndex + 6);
  }

  const handleClickedBack = () => {
    setCurrentIndex(prevCurrentIndex => prevCurrentIndex - 6);
  }

  const languageName = languageCodes[movie.original_language] || movie.original_language;

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

<style>
  {`
   .details{
    background-image: url(https://image.tmdb.org/t/p/original/${movie.poster_path});
   }

   @media screen and (min-width: 1000px){
    .details{
      background-image: url(https://image.tmdb.org/t/p/original/${movie.backdrop_path});
     }
   }
  `}
</style>
      
      <div className="details">

      <div className="details-content">

      <div className="row">
        <div className="col-4 mt-4 mt-xl-5 mb-4 mb-xl-5" style={{zIndex: '9'}}>

        {/* Display the movie poster */}
        <img className="details-img d-flex"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
            />
        </div>

        <div className="col-8 mt-4 mt-xl-5 ps-2" style={{zIndex: '9'}}>

          <div className="d-flex movie-head">

            <div className="col-9 col-lg-10">
              {/* Movie title */}
          <h2 className="fs-1 ms-4 me-4 trailer-link" style={{ zIndex: "7", fontFamily:'Montserrat'}}>
            {movie.title}
          </h2>
            </div>
          
          <div className="col d-flex justify-content-end">
            {/* Like button to like the movie */}
          <svg viewBox="0 0 512 512" onClick={handleClick} className='mt-2 me-5 likeButton'>
            <path 
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" 
            fill={isLiked ? "#FFEF9F" : "white"}
            style={isLiked ? { opacity: '1' } : { opacity: '0.3' }}
            />
          </svg>
          </div>

          </div>


          {/* Overview of movie */}
          <h6 className="text-white details-overview ms-4 mt-2 mt-xl-4">
            {movie.overview}
          </h6>

          {/* Display movie genres */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Genres: </p>
            {genres.length ? genres.map(genre => genre.name).join(", ") : 'No genres available'}
          </h6>

          {/* Display movie director */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Director: </p>
            {director}
          </h6>
          
          {/* Display movie cast */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Cast: </p>
            {cast.length > 0 ? cast.slice(0, 4).map(c => c.name).join(", ") : 'No cast information available'}
          </h6>
          
          {/* Display movie rating */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Rating: </p>
            {Math.round(movie.vote_average)} / 10
            <p className="ms-2 text-light">( {(movie.vote_count/1000).toFixed(2)}k votes )</p>
          </h6>

          {/* Language of movie */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Language: </p>
            {languageName}
          </h6>
          
        </div>
  </div>

           <h3 className="mt-4 cast text-white position-relative" style={{fontFamily: 'Montserrat', zIndex:'9'}}>Cast :</h3>

<div className="trending-slider-sm m-4 position-relative">

{cast.map((actor, index) => (
  actor.profile_path ? (
    <div className="me-4" key={actor.id} style={{zIndex: '9'}}>
    <Link to={`/actor/${actor.id}`}>
    <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:'130px', height:'160px',borderRadius:'1vh'}}/>
    </Link>
  <div className="card-body mt-1">
    <h5 className="movie-title fw-bolder text-white text-center" style={{fontSize: '15px', width:'130px'}}>{actor.name}</h5>
    <p className="card-text liked text-center" style={{fontSize: '13px', width:'130px'}}>{actor.character}</p>
  </div>
    </div>
) : null
))}
  </div>

  <div className="trending-slider mt-4">
  { !isFirstIndex && 
    <button className="me-4 me-md-5" style={{border: 'none', backgroundColor: 'transparent', marginTop:'-5vh', zIndex:'10'}} onClick={handleClickedBack}>
      <img src={arrow} className='d-flex details-arrow position-relative' style={{marginTop:'4.5%', rotate: '180deg'}} alt='slide back'/>
    </button>
  }
  {cast.slice(currentIndex, currentIndex + 6).map((actor) => (
    actor.profile_path ? (
        <div className="me-4 me-xl-5" key={actor.id} style={{zIndex: '9'}}>
          <Link to={`/actor/${actor.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:"130px", height:"140px"}}/>
          </Link>
          <div className="card-body mt-2">
            <h5 className="fw-bolder text-white text-center" style={{fontSize: '1.8vh', width:"130px"}}>{actor.name}</h5>
            <p className="card-text liked text-center" style={{fontSize: '1.6vh', width:"130px"}}>{actor.character}</p>
          </div>
        </div>
    ) : null
  ))}
  { !isLastIndex && 
    <button className="ms-4 ms-xl-2" style={{border: 'none', backgroundColor: 'transparent', marginTop:'-5vh', zIndex:'10'}} onClick={handleClicked}>
      <img src={arrow} className='details-arrow position-relative' style={{marginTop:'10.5%'}} alt='slide next'/>
    </button>
  }
</div>

<h3 className="mt-4 mt-xl-5 reviews text-white position-relative" style={{fontFamily: 'Montserrat', zIndex:'9'}}>Reviews :</h3>

        <div className="text-white review position-relative pb-5" style={{zIndex: '9'}}>

    <div className="mt-4 d-md-none" key={reviews.id} style={{width: '95%', fontWeight:'900', fontSize:'2.4vw', backgroundColor: "rgb(0,0,0,0.3)"}}>
    {reviews.length ? (
      reviews.slice(0,1).map((review) => (
        <div key={review.id}>
          <p className="mt-3 trailer-link" style={{fontSize:"1rem"}}>
          {review.content.length > 500
            ? `${review.content.substring(0, 500)}...`
            : review.content}
        </p>
        <div className="d-flex">
        <p>~ {review.author}</p>
        <Link to={`/movie/${movie.id}/reviews`}>
        <p className="ms-4 text-decoration-underline text-warning">Read more</p>
        </Link>
        </div>
        </div>
    ))
    ) : (
      <p>No Reviews Available</p>
    )}
    </div>

    <div className="mt-4 details-overview review-1 d-none d-md-block" key={reviews.id} style={{fontWeight:'900', backgroundColor: "rgb(0,0,0,0.3)"}}>
    {reviews.length ? (
      reviews.slice(0,1).map((review) => (
        <div key={review.id}>
          <p className="mt-3 trailer-link" style={{fontSize:"1rem"}}>
          {review.content.length > 800
            ? `${review.content.substring(0, 800)}...`
            : review.content}
        </p>
        <div className="d-flex">
        <p>~ {review.author}</p>
        <Link to={`/movie/${movie.id}/reviews`}>
      <p className="ms-4 text-decoration-underline d-xxl-none text-warning">Read more</p>
      </Link>
        </div>
        </div>
    ))
    ) : (
      <p>No Reviews Available</p>
    )}
    </div>


    <div className="mt-4 details-overview review-1 d-none d-xxl-block" key={reviews.id} style={{fontWeight:'900', backgroundColor: "rgb(0,0,0,0.3)"}}>
    {reviews.length ? (
      reviews.slice(1,2).map((review) => (
      <div key={review.id}>
        <p className="trailer-link">
        {review.content.length > 500
          ? `${review.content.substring(0, 500)}...`
          : review.content}
      </p>
      <div className="d-flex">
      <p>~ {review.author}</p>
      <Link to={`/movie/${movie.id}/reviews`}>
      <p className="ms-4 text-decoration-underline text-warning">Read more</p>
      </Link>
      </div>
      </div>
      ))
    ) : (
      <p>No Reviews Available</p>
    )}
    </div>

</div>

      </div>
  
      </div>
</div>

  );
}

export default MovieDetails;