import React, {useEffect, useState} from "react";
import firebase from "firebase/compat/app";
import Footer from "../components/footer";
import Latest from "../components/homepage/latest/latest";
import LatestTV from "../components/homepage/latest/latestTv";
import Navbar from "../components/navbar";
import OngoingTV from "../components/homepage/ongoingTv";
import Popular from "../components/homepage/popular/popular";
import PopularTV from "../components/homepage/popular/popularTv";
import TopRated from "../components/homepage/topRated/topRated";
import TopRatedTV from "../components/homepage/topRated/topRatedTv";
import Trending from "../components/homepage/trending/trending";
import TrendingMovies from "../components/homepage/trending/trendingMovies";
import TrendingShows from "../components/homepage/trending/trendingTV";
import Upcoming from "../components/homepage/upcoming";

function Homepage() {

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
  
  return (
      <>
      <Navbar isSignedIn={isSignedIn}/>
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