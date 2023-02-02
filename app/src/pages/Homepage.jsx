import React, {useState} from "react";
import Navbar from "../components/navbar";
import Trending from "../components/trending";
import TrendingWeek from "../components/trendingWeek";

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
      <TrendingWeek/>
      </>
  );
}

export default Homepage;