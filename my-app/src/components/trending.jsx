import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Carousel from "../components/carousel";

const Trending = () => {

    
  const movies = useSelector((state) => state.cinera.movies);
  const genres = useSelector((state) => state.cinera.genres);
  const genresLoaded = useSelector((state) => state.cinera.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: "all" }));
    }
  }, [genresLoaded]);

    return(

        // Top Trending Content 
        <div className="trending-content-div p-0 g-0 m-0">

            <div className="d-none d-xxl-block">
            <div className="trending-heading text-white fw-bolder position-absolute">
                    TOP TRENDING
                </div>

    <div className="position-relative col-12 carousel-xxl ms-5">
        <Carousel/>
</div>

            </div>

                {/* <Slider movies={movies}/> */}

                <div className="d-block d-xxl-none  container-fluid">
            <div className="ms-3 ms-lg-4 text-white mt-5 fw-bold trending-heading-sm">
                    TOP TRENDING
                </div>

            <div className="mt-4">
                <Carousel/>
            </div>
            </div>
            
        </div>
    );
}

export default Trending;