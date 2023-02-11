import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from "../../../utils/constants";
import Footer from "../../../components/footer";
import Navbar from "../../../components/navbar";

function Reviews() {
  // Destructure the id from the URL parameters
  const { id } = useParams();

  // State variables to store movie reviews
  const [reviews, setReviews] = useState([]);

  // Use effect to fetch the data for movie details, video, genres and cast
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch movie reviews
        const reviewResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}`);
        setReviews(reviewResponse.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]); // Re-run the effect only when the id changes

  return (
      <div>
        <Navbar/>
        <div className="mt-4 mt-xxl-5" style={{marginLeft: "7%", marginRight:"7%"}}>
    <h3 className="trailer-link" style={{fontFamily: 'Montserrat'}}>Reviews :</h3>

    <div className="text-white mt-4 mb-4" key={reviews.id} style={{fontWeight:'900', fontFamily:"Poppins", fontSize:'1.1rem', borderTop: "1px solid gray"}}>
    {reviews.length ? (
        reviews.map((review) => (
      <div className="overview text-white mt-4 mb-4" key={review.id} style={{borderBottom: "1px solid gray"}}>
        <p>{review.content}</p>
      <p className="trailer-link mb-4">~ {review.author}</p>
      </div>
        ))
        ) : (
            <p>No Reviews Available</p>
        )}
    </div>
      </div>
      <Footer className='mt-5'/>
      </div>

  );
}

export default Reviews;