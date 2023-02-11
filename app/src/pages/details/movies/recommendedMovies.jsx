import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_KEY } from "../../../utils/constants";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

// RecommendationsMovies component to display recommended movies based on the movie id
const RecommendationsMovies = () => {
  // Destructure the id from the URL parameters
  const { id } = useParams();

  // State variables to store the recommended movies, current page index, total pages and the movie details
  const [recommendations, setRecommendations] = useState([]);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState();
  const [movie, setshow] = useState([]);

  // useEffect hook to fetch the data for the movie and its recommended movies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch details of the movie
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setshow(movieResponse.data);

        // Fetch the recommended movies
        const recommendationsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&adult=false&page=${index}`);
        setRecommendations(recommendationsResponse.data.results);
        setPage(recommendationsResponse.data.total_pages);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, index]); // Re-run the effect only when the id and index changes

  // Function to handle the previous page button click
  const handlePreviousPage = () => {
    if (index > 1) {
        setIndex(index - 1);
      }
  }
  
  // Function to handle the next page button click
  const handleNextPage = () => {
    if (index < page) {
        setIndex(index + 1);
      }
  }

  return (
    <div>
      {/* Navbar component */}
      <Navbar/>

      {/* Recommendations header */}
      <div className="m-4 mt-xl-5 ms-lg-5 text-center text-lg-start text-white fs-3 position-relative" style={{fontFamily: 'Montserrat', zIndex:'9'}}>
        Recommendations - 
        {/* Link to the movie detail page */}
        <Link to={`/movie/${movie.id}`} className='ms-2 me-2 trailer-link fw-bold'>{movie.title}</Link>
        :
      </div>
      
      {/* Display the recommended movies */}
      <div className="d-flex justify-content-center ms-4 ms-md-5 me-md-5 me-4 mb-5 flex-wrap">
        {recommendations.map(movies => (
            movies.poster_path && movies.title && (
            //  wrapper div for each movie
            <div key={movies.id}>
                {/* Link to the movie detail page */}
                <Link to={`/movie/${movies.id}`}>
                    {/* Display the movie poster */}
                    <img className='me-4 mt-4' style={{width:'220px', height: '320px'}} src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} />
                    </Link>
                    {/* Display the movie like percentage */}
                    <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'220px'}}>{Math.round((movies.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
                    {/* Display the movie title */}
                    <p className='movie-original_name me-4 text-white fw-bolder mt-1 text-center' style={{width:'220px', fontFamily:"Poppins"}}>{movies.title}</p>
            </div>
            )
      ))}
      </div>
      {/* wrapper for the page navigation buttons */}
      <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
        {/* Previous page button */}
        <button className="ms-4 ms-md-5 btn btn-dark" onClick={handlePreviousPage}>Previous</button>
        {/* Display the current page number */}
        <p className="text-secondary mt-3">Page {index} / {page}</p>
        {/* Next page button */}
        <button className="me-4 me-md-5 btn btn-dark" onClick={handleNextPage}>Next</button>
    </div>

      {/* Footer component */}
      <Footer/>
</div>


  );
}

export default RecommendationsMovies;