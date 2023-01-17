import React, {useState} from "react";
import Navbar from "../components/navbar";
import Trending from "../components/trending";

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
      </>
  );
}

export default Homepage;