import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Navbar from "../components/navbar";
import Trending from "../components/trending";

const Homepage = () => {

  const dispatch = useDispatch();

  const genresLoaded = useSelector((state) => state.cinera.genresLoaded);
  
  useEffect(() => {
  dispatch(getGenres())
}, []);

useEffect(() => {
  if(genresLoaded)
  dispatch(fetchMovies({type: "all"}));
})

  return (
    <div>
      <Navbar/>
      <Trending/>
    </div>
  );
};

export default Homepage;
