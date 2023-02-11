import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_KEY } from "../../../utils/constants";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

function RecommendationsShows() {
  // Destructure the id from the URL parameters
  const { id } = useParams();

  const [recommendations, setRecommendations] = useState([]);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState();
  const [tv, setTv] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}`);
        setTv(movieResponse.data);

        const recommendationsResponse = await axios.get(`https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=${API_KEY}&language=en-US&adult=false&page=${index}`);
        setRecommendations(recommendationsResponse.data.results);
        setPage(recommendationsResponse.data.total_pages);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id, index]); // Re-run the effect only when the id changes

  const handlePreviousPage = () => {
    if (index > 1) {
        setIndex(index - 1);
      }
  }
  
  const handleNextPage = () => {
    if (index < page) {
        setIndex(index + 1);
      }
  }

  return (
    

<div>
<Navbar/>

<div className="m-4 mt-xl-5 ms-lg-5 text-center text-lg-start text-white fs-3 position-relative" style={{fontFamily: 'Montserrat', zIndex:'9'}}>Recommendations - 
<Link to={`/tv/${tv.id}`} className='ms-2 me-2 trailer-link fw-bold'>{tv.name}</Link>
 :</div>
<div className="d-flex justify-content-center ms-4 ms-md-5 me-md-5 me-4 mb-5 flex-wrap">
            {recommendations.map(movies => (
              movies.poster_path && movies.name && (
        <div key={movies.id}>
          <Link to={`/tv/${movies.id}`}>
          <img className='me-4 mt-4' style={{width:'220px', height: '320px'}} src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.name} />
          </Link>
          <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'220px'}}>{Math.round((movies.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='tv-original_name me-4 text-white fw-bolder mt-1 text-center' style={{width:'220px', fontFamily:"Poppins"}}>{movies.name}</p>
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

  );
}

export default RecommendationsShows;