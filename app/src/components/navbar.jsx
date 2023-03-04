import React, {useState, useEffect} from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { NavLink, Link, useLocation } from "react-router-dom";
import SearchBar from "./searchbar";

const Navbar = () => {

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

  const handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        setIsSignedIn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isDiscoverPage = (
  location.pathname === "/movies" ||
  location.pathname === "/shows" || 
  location.pathname === "/trending" ||
  location.pathname === "/popular/movies" || 
  location.pathname === "/popular/shows" ||
  location.pathname === "/top-rated/movies" || 
  location.pathname === "/top-rated/shows" ||
  location.pathname === "/upcoming/movies" || 
  location.pathname === "/todays-recommendations" ||
  location.pathname === "/airing-today/shows"
  );
  const isProfilePage = location.pathname === "/profile";

  return (
    <div className="navbar-section">
      {/* -------- Upper Navbar -------- */}
      <div className="upper-navbar-div p-0 g-0 m-0">

        {/* ---- Upper Navbar Content visible only in larger devices ---- */}
        <nav className="navbar navbar-dark">
          <div className="container-fluid mt-lg-2">
            
            {/* -------- Searchbar for larger devices -------- */}
            <div className="searchbar-div p-0 g-0 m-0 d-none d-lg-block">
            <SearchBar placeholder=" Search for movies, shows and more..."/> 
            </div>

            {/* ---- Sign In/Register link if the user is not logged in ---- */}
            <div className="signin-div p-0 g-0 m-0">
            {isSignedIn ? (
                <li className="nav-item me-4 d-none d-lg-block ms-auto">
                  <li className="nav-link sign" onClick={handleLogout}>LOGOUT</li>
                </li>
            ) : (
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <li className="nav-item me-4 d-none d-lg-block ms-auto">
                  <li className="nav-link sign">SIGN IN/REGISTER</li>
                </li>
              </NavLink>
            )}
            </div>
          </div>
        </nav>
      </div>

      {/* Lower Navbar */}
      <div className="lower-navbar-div g-0 p-0 m-0">

        {/* ---- Lower Navbar Content ---- */}
        <div className="navbar navbar-expand-lg navbar-dark">

          {/* Navbar Brand for smaller devices */}
          <Link to='/' className="navbar-brand ms-4 d-block d-lg-none text-decoration-none">CINÈRA</Link>

          {/* Menu button */}
          <button
            className="navbar-toggler me-4 ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu List */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0">

              {/* Home link */}
              <NavLink className={"ms-auto me-auto"} to="/" style={{ textDecoration: "none" }}>
                <li className="nav-item me-lg-5">
                  <li className={"nav-link" + (isHomePage ? " active" : "")} aria-current="page">
                    HOME
                  </li>
                </li>
              </NavLink>

              {/* Discover dropdown link */}
              <li className="nav-item dropdown me-lg-5 ms-auto me-auto">
                <li
                  className={"nav-link dropdown-toggle" + (isDiscoverPage ? " active" : "")}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  DISCOVER
                </li>

                {/* Dropdown menu of Discover */}
                <ul className="dropdown-menu me-lg-5 ms-auto me-auto" style={{width: '400px'}}>
                  <div className="row g-0">
                    <div className="col-6">
                      {/* Movies link */}
                      <NavLink to="/movies" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Movies</li>
                      </NavLink>

                      {/* Series link */}
                      <NavLink to="/shows" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Shows</li>
                      </NavLink>

                      {/* Trending link */}
                      <NavLink to="/trending" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Trending</li>
                      </NavLink>

                      {/* Recommended link */}
                      <NavLink
                        to="/todays-recommendations"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Recommended</li>
                      </NavLink>

                      {/* Ongoing link */}
                      <NavLink
                        to="/upcoming/movies"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Upcoming Movies</li>
                      </NavLink>

                    </div>

                    <div className="col-6">

                      {/* Popular link */}
                      <NavLink to="/popular/movies" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Popular Movies</li>
                      </NavLink>

                      <NavLink to="/popular/shows" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Popular Shows</li>
                      </NavLink>

                      {/* Top Rated link */}
                      <NavLink
                        to="/top-rated/movies"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Top Rated Movies</li>
                      </NavLink>

                      <NavLink
                        to="/top-rated/shows"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Top Rated Shows</li>
                      </NavLink>

                      {/* Airing Today Movies */}
                      <NavLink
                        to="/airing-today/shows"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Airing Today</li>
                      </NavLink>

                    </div>
                  </div>
                </ul>
              </li>

              {/* Nabar Brand for larger devices */}
              <Link to='/' className="navbar-brand mx-auto me-lg-5 d-none d-lg-block text-decoration-none">
                CINÈRA
              </Link>

              {/* About link */}
              <NavLink className={"ms-auto me-auto"} to="/about" style={{ textDecoration: "none" }}>
                <li className="nav-item me-lg-5 ms-xxl-5">
                  <li className={"nav-link" + (isAboutPage ? " active" : "")}>ABOUT</li>
                </li>
              </NavLink>

              {/* Profile link */}
              <NavLink className={"ms-auto me-auto"} to="/profile" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <li className={"nav-link" + (isProfilePage ? " active" : "")} role="button" aria-expanded="false">
                    PROFILE
                  </li>
                </li>
              </NavLink>

              {/* Signin/Register link for smaller devices */}
              {isSignedIn ? (
                <li className="nav-item me-4 d-lg-none d-block  me-auto ms-auto">
                  <li className="nav-link sign" onClick={handleLogout}>LOGOUT</li>
                </li>
            ) : (
              <NavLink className={"ms-auto me-auto"} to="/signin" style={{ textDecoration: "none" }}>
                <li className="nav-item me-1 d-lg-none d-block">
                  <li className="nav-link">SIGN IN/REGISTER</li>
                </li>
              </NavLink>
            )}

              {/* Searchbar for smaller devices */}
              <li className="nav-item mt-3 d-block d-lg-none">
                <SearchBar placeholder=" Search for movies, shows and more..."/> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
