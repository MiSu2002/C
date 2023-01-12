import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Trending from "../components/trending";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../components/slider";

function Homepage() {
  const [isScrolled, setIsScrolled] = useState(false);
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

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
      <>
      <Navbar isScrolled={isScrolled} />
      <Trending/>
      <Slider movies={movies} />
      </>
  );
}

export default Homepage;