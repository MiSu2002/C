import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

const Card = ({movieData, isliked = false}) =>{

    const [isHovered,setIsHovered] = useState(false);
    const navigate = useNavigate();
    return(
        <div className="card mt-4 ms-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)
        }>
            <img src = {`https://image.tmdb.org/t/p/w500${movieData.image}`} alt="movies"/>
        </div>
    )
}

export default Card;