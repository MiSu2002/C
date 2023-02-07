import React, {useState} from "react";
import Footer from "../components/footer";
import Latest from "../components/latest";
import LatestTV from "../components/latestTv";
import Navbar from "../components/navbar";
import OngoingTV from "../components/ongoingTv";
import Popular from "../components/popular";
import PopularTV from "../components/popularTv";
import TopRated from "../components/topRated";
import TopRatedTV from "../components/topRatedTv";
import Trending from "../components/trending";
import TrendingMovies from "../components/trendingMovies";
import TrendingShows from "../components/trendingTV";
import Upcoming from "../components/upcoming";

function Homepage() {

  const [isScrolled, setIsScrolled] = useState(false);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  
  return (
      <>
      <Navbar isScrolled={isScrolled} />
      <Trending/>
      <TrendingMovies/>
      <TrendingShows/>
      <TopRated/>
      <TopRatedTV/>
      <Popular/>
      <PopularTV/>
      <Latest/>
      <LatestTV/>
      <Upcoming/>
      <OngoingTV/>
      <Footer/>
      </>
  );
}

export default Homepage;