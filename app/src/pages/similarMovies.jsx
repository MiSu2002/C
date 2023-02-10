import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { API_KEY } from "../utils/constants";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function SimilarMovies() {
  // Destructure the id from the URL parameters
  const { id } = useParams();

  const [similar, setSimilar] = useState([]);
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(movieResponse.data);

        const similarResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&adult=false`);
        setSimilar(similarResponse.data.results);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]); // Re-run the effect only when the id changes

  return (
    

<div>
<Navbar/>

<h3 className="mt-4 mt-xl-5 d-flex reviews text-white position-relative" style={{fontFamily: 'Montserrat', zIndex:'9'}}>Movies Similar to 
<Link to={`/movie/${movie.id}`} style={{textDecorationColor:"#FFF0C8"}}><p className="ms-2 fw-bold trailer-link me-2" >'{movie.title}'</p></Link>
 :</h3>
<div className="d-flex justify-content-center ms-4 ms-md-5 me-md-5 me-4 mb-5 flex-wrap">
            {similar.map(movies => (
              movies.poster_path && movies.title && (
        <div key={movies.id}>
          <Link to={`/movie/${movies.id}`}>
          <img className='me-4 mt-4' style={{width:'220px', height: '320px'}} src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`} alt={movies.title} />
          </Link>
          <p className='liked fw-bolder me-4 mt-2 mb-0 text-center' style={{width:'220px'}}>{Math.round((movies.vote_average + Number.EPSILON)*1000)/100}% Liked This</p>
          <p className='movie-title me-4 text-white fw-bolder mt-1 text-center' style={{width:'220px', fontFamily:"Poppins"}}>{movies.title}</p>
        </div>
              )
      ))}
            </div>

      <Footer/>
</div>

  );
}

export default SimilarMovies;