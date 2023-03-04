import React, { useState, useEffect } from "react";
import axios from 'axios';
import firebase from "firebase/compat/app";
import { useParams, Link } from 'react-router-dom';
import { API_KEY } from "../../utils/constants";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import SignIn from "../signIn";

function ActorInfo() {
  // Destructure the id from the URL parameters
  const { actorId } = useParams();
  // State variables to store actor and credits information
  const [actor, setActor] = useState({});
  const [cast, setMovie] = useState([]);
  const [tv, setTv] = useState([]);

  const [isSignedIn, setIsSignedIn] = useState(false);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
    return unsubscribe;
  }, []);

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

        //Fetch tv credits of that actor
        const creditResponse = await axios.get(`https://api.themoviedb.org/3/person/${actorId}/tv_credits?api_key=${API_KEY}`);
        setTv(creditResponse.data.cast);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [actorId]); // Re-run the effect only when the actorId changes

  return (
    <div>
      {isSignedIn ? (
        <div>
        <Navbar />
  
        <div className="actorInfo text-white">
        
        <div className="d-lg-none mx-auto" style={{width: "80%"}}>
          <div className="d-flex justify-content-center mt-5">
          <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:"50%", border: "1px solid rgb(255,255,255,0.5)", borderRadius:"1vh"}}/>
          </div>
          <div className="mt-4 mt-lg-5" style={{backgroundColor:"rgb(20,20,50,0.5"}}>
            <h1 className="d-flex trailer-link justify-content-center justify-content-lg-start" style={{fontFamily:"Montserrat"}}>{actor.name}</h1>
          <p className="mt-5" style={{textAlign: "justify", fontFamily:"Poppins", fontWeight:"900"}}>{actor.biography}</p></div>
        </div>
  
        <div className="d-none d-lg-block">
          <div className="row mx-auto" style={{width: "80%"}}>
          <div className="col-3 d-flex justify-content-center mt-5">
          <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} style={{width:"250px", height:"350px", border: "1px solid rgb(255,255,255,0.5)", borderRadius:"1vh"}}/>
          </div>
          <div className="col mt-4 mt-lg-5" style={{backgroundColor:"rgb(20,20,50,0.5"}}>
            <h1 className="d-flex trailer-link justify-content-center justify-content-lg-start" style={{fontFamily:"Montserrat"}}>{actor.name}</h1>
          <p className="mt-5" style={{textAlign: "justify", fontFamily:"Poppins", fontWeight:"900"}}>{actor.biography}</p></div>
        </div>
        </div>
  
        <div className="mx-auto mt-5" style={{width:"85%",borderTop: "2px solid gray", borderBottom: "2px solid gray"}}>
        <h3 className="mt-5 trailer-link" style={{marginLeft:"4%", fontFamily:"Montserrat"}}>Movies: </h3>
  
  <div className="d-flex flex-wrap mb-5">
    {cast.map(movie => (
       movie.title && movie.poster_path ? (
        <div style={{marginLeft:"4%"}}>
          <Link to={`/movie/${movie.id}`}>
          <img className="mt-5" style={{width: "200px", height: "300px"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
          </Link>
          <p className="text-center mt-2" style={{width:"200px", fontFamily:"Poppins", fontWeight:"900"}} key={movie.id}>{movie.title}</p>
        </div>
      ) : null
    ))}
  </div>
        </div>
  
        <div className="mx-auto mb-5" style={{width:"85%", borderBottom: "2px solid gray"}}>
        <h3 className="mt-5 trailer-link" style={{marginLeft:"4%", fontFamily:"Montserrat"}}>TV Shows / Series: </h3>
  
  <div className="d-flex flex-wrap mb-5">
    {tv ? (
      tv.map((show) => (
        show.poster_path && show.name ? (
          <div style={{marginLeft:"4%"}} key={show.id}>
            <Link to={`/tv/${show.id}`}>
            <img className="mt-5" style={{width: "200px", height: "300px"}} src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} alt={show.title}/>
            </Link>
            <p className="text-center mt-2" style={{width:"200px", fontFamily:"Poppins", fontWeight:"900"}} key={show.id}>{show.name}</p>
          </div>
          ) : null
      ))
        ) : (
        <p>Not Available</p>
       )}
  </div>
  
        </div>
    </div>
    <Footer className='mt-5'/>
      </div>
      ) : <SignIn/>}
    </div>
  );
}

export default ActorInfo;