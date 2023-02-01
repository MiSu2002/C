import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { API_KEY } from "../utils/constants";

function ActorInfo() {
  // Destructure the id from the URL parameters
  const { actorId } = useParams();
  // State variables to store actor and credits information
  const [actor, setActor] = useState({});
  const [cast, setMovie] = useState([]);

  // Use effect to fetch the data for the actor
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch actor information
        const actorResponse = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`);
        setActor(actorResponse.data);

        //Fetch movie credits of that actor
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${API_KEY}`);
        setMovie(creditsResponse.data.cast);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [actorId]); // Re-run the effect only when the actorId changes

  return (
    <div className="text-white mb-5">
      
      <div className="d-lg-none mx-auto" style={{width: "80%"}}>
        <div className="d-flex justify-content-center mt-5">
        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:"50%", border: "1px solid rgb(255,255,255,0.7)", borderRadius:"1vh"}}/>
        </div>
        <div className="mt-4 mt-lg-5" style={{backgroundColor:"rgb(20,20,50,0.5"}}>
          <h1 className="d-flex trailer-link justify-content-center justify-content-lg-start" style={{fontFamily:"Montserrat"}}>{actor.name}</h1>
        <p className="mt-5" style={{textAlign: "justify", fontFamily:"Poppins", fontWeight:"900"}}>{actor.biography}</p></div>
      </div>

      <div className="d-none d-lg-block d-xxl-none">
        <div className="row mx-auto" style={{width: "80%"}}>
        <div className="col-4 d-flex justify-content-center mt-5">
        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:"100%", height:"70%", border: "1px solid rgb(255,255,255,0.7)", borderRadius:"1vh"}}/>
        </div>
        <div className="col mt-4 mt-lg-5" style={{backgroundColor:"rgb(20,20,50,0.5"}}>
          <h1 className="d-flex trailer-link justify-content-center justify-content-lg-start" style={{fontFamily:"Montserrat"}}>{actor.name}</h1>
        <p className="mt-5" style={{textAlign: "justify", fontFamily:"Poppins", fontWeight:"900"}}>{actor.biography}</p></div>
      </div>
      </div>

      <div className="d-none d-xxl-block">
        <div className="row mx-auto" style={{width: "80%"}}>
        <div className="col-4 d-flex justify-content-center mt-5">
        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:"75%", height:"90%", border: "1px solid rgb(255,255,255,0.7)", borderRadius:"1vh"}}/>
        </div>
        <div className="col mt-4 mt-lg-5" style={{backgroundColor:"rgb(20,20,50,0.5"}}>
          <h1 className="d-flex trailer-link justify-content-center justify-content-lg-start" style={{fontFamily:"Montserrat"}}>{actor.name}</h1>
        <p className="mt-5" style={{textAlign: "justify", fontFamily:"Poppins", fontWeight:"900"}}>{actor.biography}</p></div>
      </div>
      </div>

      <h3 className="mt-5 trailer-link" style={{marginLeft:"4%", fontFamily:"Montserrat"}}>Movies: </h3>

      <div className="d-flex ms-4 flex-wrap justify-content-center">
        {cast.map(movie => (
           movie.title && movie.poster_path ? (
            <div>
              <Link to={`/movie/${movie.id}`}>
              <img className="me-4 mt-5" style={{width: "200px", height: "300px"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
              </Link>
              <p className="text-center me-4 mt-2" style={{width:"200px", fontFamily:"Poppins", fontWeight:"900"}} key={movie.id}>{movie.title}</p>
            </div>
          ) : null
        ))}
      </div>
      
    
  </div>
  );
}

export default ActorInfo;