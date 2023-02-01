import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_KEY } from "../utils/constants";

function ActorInfo() {
  // Destructure the id from the URL parameters
  const { actorId } = useParams();
  // State variables to store actor information
  const [actor, setActor] = useState({});

  // Use effect to fetch the data for the actor
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch actor information
        const actorResponse = await axios.get(`https://api.themoviedb.org/3/person/${actorId}?api_key=${API_KEY}&language=en-US`);
        setActor(actorResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [actorId]); // Re-run the effect only when the actorId changes

  return (
    <div className="text-white mb-5">
      
      <div className="row mx-auto" style={{width: "80%"}}>
        <div className="col-md-4 d-flex justify-content-center mt-5">
        <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width: "70%", height: "min-content", border: "1px solid #fff", borderRadius:"1vh"}}/>
        </div>
        <div className="col mt-4 mt-md-5">
          <h1 className="d-flex trailer-link justify-content-center justify-content-md-start">{actor.name}</h1>
        <p className="mt-5" style={{textAlign: "justify"}}>{actor.biography}</p></div>
      </div>
    
  </div>
  );
}

export default ActorInfo;