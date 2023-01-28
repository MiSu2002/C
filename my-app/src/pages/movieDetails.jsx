import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from "../utils/constants";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [video, setVideo] = useState(null);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
            .then(response => {
                setMovie(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
            .then(response => {
                setVideo(response.data.results[0]);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);
                

    return (
        <div>
            {video &&(
            <iframe className="position-absolute trailer" title={`${movie.title}`} src={`https://www.youtube.com/embed/${video.key}?rel=0`} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            )};
            <div className="details position-absolute">
            <h2 className="fs-1 m-4" style={{zIndex:'7', color:'#FFF0C8'}}>{movie.title}</h2>
            <p className="overview m-4">{movie.overview}</p>
            </div>
        </div>
    );
}

export default MovieDetails;
