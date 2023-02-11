import React, { useState, useEffect } from "react";
import axios from "axios";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { API_KEY } from "../../utils/constants";
import { Link } from "react-router-dom";

const TopRatedShows = () =>{
    const [movie, setMovie] = useState([]);
    const [index, setIndex] = useState(1);
    const [page, setPage] = useState();

// Use effect to fetch the data for Shows
useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&sort_by=TopRatedity.desc&include_adult=false&include_video=false&page=${index}`);
        setMovie(movieResponse.data.results);
        setPage(movieResponse.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [index]); // Re-run the effect only when the id changes

  const handlePreviousPage = () => {
    if (index > 0) {
        setIndex(index - 1);
      }
  }
  
  const handleNextPage = () => {
    if (index < page) {
        setIndex(index + 1);
      }
  }
    return(
        <div>
            <Navbar/>
            <div className="d-flex mt-5 mb-4 ">
            <h2 className="ms-4 ms-md-5 trailer-link" style={{fontFamily:'Montserrat'}}>Top Rated Shows</h2>
            </div>
            <div className="d-flex justify-content-center ms-4 ms-md-5 me-md-5 me-4 flex-wrap">
            {movie.map(shows => (
              shows.poster_path && shows.name && (
        <div key={shows.id}>
          <Link to={`/tv/${shows.id}`}>
          <img className='me-4 mt-4' style={{width:'220px', height: '320px'}} src={`https://image.tmdb.org/t/p/w500/${shows.poster_path}`} alt={shows.title} />
          </Link>
          <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'220px'}}>{Math.round((shows.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='movie-title me-4 text-white fw-bolder mt-1 text-center' style={{width:'220px', fontFamily:"Poppins"}}>{shows.name}</p>
        </div>
              )
      ))}
            </div>
            <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
  <button className="ms-4 ms-md-5 btn btn-dark" onClick={handlePreviousPage}>Previous</button>
  <p className="text-secondary mt-3">Page {index} / {page}</p>
  <button className="me-4 me-md-5 btn btn-dark" onClick={handleNextPage}>Next</button>
</div>
            <Footer/>
        </div>
    )
}

export default TopRatedShows;