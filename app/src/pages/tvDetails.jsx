import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import arrow from '../assets/icons/right-arrow.png';
import { API_KEY } from "../utils/constants";

function TVDetails() {
  // Destructure the id from the URL parameters
  const { id } = useParams();

  // State variables to store show details, video, genres, like and cast
  const [show, setShow] = useState({});
  const [video, setVideo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLastIndex = currentIndex + 6 >= cast.length;
  const isFirstIndex = currentIndex <= 0;

  // Use effect to fetch the data for show details, video, genres and cast
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch show details
        const tvResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`);
        setShow(tvResponse.data);
        setGenres(tvResponse.data.genres);

        // Fetch show cast
        const castResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`);
        setCast(castResponse.data.cast);
        setDirector(castResponse.data.crew.find(member => member.job === 'Director').name);

        // Fetch show video
        const videoResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${API_KEY}&language=en-US`);
        const trailer = videoResponse.data.results.find((video) => video.type === "Trailer");
        setVideo(trailer || videoResponse.data.results[0]);

        const reviewResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${API_KEY}`);
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

  return (
    <div>
      {/* Display the show trailer if it is available */}
      {video && (
        <iframe
          className="trailer"
          title={`${show.original_name}`}
          src={`https://www.youtube.com/embed/${video.key}?rel=0`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope;"
          allowFullScreen
        />
      )}

<style>
  {`
   .details{
    background-image: url(https://image.tmdb.org/t/p/original/${show.poster_path});
   }

   @media screen and (min-width: 1000px){
    .details{
      background-image: url(https://image.tmdb.org/t/p/original/${show.backdrop_path});
     }
   }
  `}
</style>
      
      <div className="details">

      <div className="details-content">

      <div className="row">
        <div className="col-4 mt-4 mt-xl-5 mb-4 mb-xl-5" style={{zIndex: '9'}}>

        {/* Display the show poster */}
        <img className="details-img d-flex"
              src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
              alt={show.original_name}
            />
        </div>

        <div className="col-8 mt-4 mt-xl-5 ps-2" style={{zIndex: '9'}}>

          <div className="d-flex show-head">

            <div className="col-8 col-lg-10">
              {/* TV title */}
          <h2 className="fs-1 ms-4 me-4 trailer-link" style={{ zIndex: "7", fontFamily:'Montserrat'}}>
            {show.original_name}
          </h2>
            </div>
          
          <div className="col d-flex justify-content-end">
            {/* Like button to like the show */}
          <svg viewBox="0 0 512 512" onClick={handleClick} className='mt-2 me-5 likeButton'>
            <path 
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z" 
            fill={isLiked ? "#FFEF9F" : "white"}
            style={isLiked ? { opacity: '1' } : { opacity: '0.3' }}
            />
          </svg>
          </div>

          </div>


          {/* Overview of show */}
          <h6 className="text-white details-overview ms-4 mt-2 mt-xl-4">
            {show.overview}
          </h6>

          {/* Display show genres */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Genres: </p>
            {genres.length ? genres.map(genre => genre.name).join(", ") : 'No genres available'}
          </h6>

          {/* Display show director */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Director: </p>
            {director.length ? director : <p>No Director Available</p>}
          </h6>
          
          {/* Display show cast */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Cast: </p>
            {cast.length > 0 ? cast.slice(0, 4).map(c => c.name).join(", ") : 'No cast information available'}
          </h6>
          
          {/* Display show rating */}
          <h6 className="text-white details-overview ms-4 mt-4 me-5 d-flex" style={{fontWeight: '900'}}>
            <p className="me-2 trailer-link">Rating: </p>
            {Math.round(show.vote_average)} / 10
            <p className="ms-2 text-light">( {(show.vote_count/1000).toFixed(2)}k votes )</p>
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
    <h5 className="show-title fw-bolder text-white text-center" style={{fontSize: '2.15vw', width:'130px'}}>{actor.name}</h5>
    <p className="card-text liked text-center" style={{fontSize: '2.05vw', width:'130px'}}>{actor.character}</p>
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
            <h5 className="fw-bolder text-white text-center" style={{fontSize: '2.1vh', width:"130px"}}>{actor.name}</h5>
            <p className="card-text liked text-center" style={{fontSize: '2vh', width:"130px"}}>{actor.character}</p>
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
        <Link to={`/show/${show.id}/reviews`}>
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
        <Link to={`/show/${show.id}/reviews`}>
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
      <Link to={`/show/${show.id}/reviews`}>
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

export default TVDetails;