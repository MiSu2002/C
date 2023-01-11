import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-section">
      {/* -------- Upper Navbar -------- */}
      <div className="upper-navbar-div p-0 g-0 m-0">

        {/* ---- Upper Navbar Content visible only in larger devices ---- */}
        <nav className="navbar navbar-dark">
          <div className="container-fluid mt-lg-2">
            
            {/* -------- Searchbar for larger devices -------- */}
            <div className="searchbar-div p-0 g-0 m-0">
              <form className="d-flex" role="search">
                <input
                  className="searchbar ms-4 d-none d-lg-block"
                  type="search"
                  placeholder="  Search for movies, genres and more..."
                  aria-label="Search"
                />
              </form>
            </div>

            {/* ---- Sign In/Register link if the user is not logged in ---- */}
            <div className="signin-div p-0 g-0 m-0">
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <li className="nav-item me-4 d-none d-lg-block ms-auto">
                  <li className="nav-link sign">SIGN IN/REGISTER</li>
                </li>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>

      {/* Lower Navbar */}
      <div className="lower-navbar-div g-0 p-0 m-0">

        {/* ---- Lower Navbar Content ---- */}
        <div className="navbar navbar-expand-lg navbar-dark">

          {/* Navbar Brand for smaller devices */}
          <li className="navbar-brand ms-4 d-block d-lg-none">CINÈRA</li>

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
            <ul className="navbar-nav ms-auto me-auto mb-2 mb-lg-0">

              {/* Home link */}
              <NavLink className={"ms-auto me-auto"} to="/" style={{ textDecoration: "none" }}>
                <li className="nav-item me-lg-5">
                  <li className="nav-link active" aria-current="page">
                    HOME
                  </li>
                </li>
              </NavLink>

              {/* About link */}
              <NavLink className={"ms-auto me-auto"} to="/about" style={{ textDecoration: "none" }}>
                <li className="nav-item me-lg-5">
                  <li className="nav-link">ABOUT</li>
                </li>
              </NavLink>

              {/* Discover dropdown link */}
              <li className="nav-item dropdown me-lg-5 ms-auto me-auto">
                <li
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  DISCOVER
                </li>

                {/* Dropdown menu of Discover */}
                <ul className="dropdown-menu me-lg-5 ms-auto me-auto">
                  <div className="row">
                    <div className="col-6">
                      {/* Movies link */}
                      <NavLink to="/movies" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Movies</li>
                      </NavLink>

                      {/* Series link */}
                      <NavLink to="/series" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Series</li>
                      </NavLink>

                      {/* Tv-shows link */}
                      <NavLink
                        to="/tv-shows"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">TV-Shows</li>
                      </NavLink>

                      {/* Recommended link */}
                      <NavLink
                        to="/recommended"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Recommended</li>
                      </NavLink>
                    </div>

                    <div className="col-6">
                      {/* Genres link */}
                      <NavLink to="/genres" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Genres</li>
                      </NavLink>

                      {/* Artists link */}
                      <NavLink to="/artists" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Artists</li>
                      </NavLink>

                      {/* Trending link */}
                      <NavLink
                        to="/trending"
                        style={{ textDecoration: "none" }}
                      >
                        <li className="dropdown-item">Trending</li>
                      </NavLink>

                      {/* Super-hits link */}
                      <NavLink to="/hits" style={{ textDecoration: "none" }}>
                        <li className="dropdown-item">Super Hits</li>
                      </NavLink>
                    </div>
                  </div>
                </ul>
              </li>

              {/* Nabar Brand for larger devices */}
              <li className="navbar-brand ms-auto me-auto me-lg-5 d-none d-lg-block">
                CINÈRA
              </li>

              {/* Watchlist link */}
              <NavLink className={"ms-auto me-auto"} to="/watchlist" style={{ textDecoration: "none" }}>
                <li className="nav-item me-lg-5">
                  <li className="nav-link watchlist">WATCHLIST</li>
                </li>
              </NavLink>

              {/* Profile link */}
              <NavLink className={"ms-auto me-auto"} to="/profile" style={{ textDecoration: "none" }}>
                <li className="nav-item me-lg-5">
                  <li className="nav-link" role="button" aria-expanded="false">
                    PROFILE
                  </li>
                </li>
              </NavLink>

              {/* Review link */}
              <NavLink className={"ms-auto me-auto"} to="/review" style={{ textDecoration: "none" }}>
                <li className="nav-item">
                  <li className="nav-link last">REVIEW</li>
                </li>
              </NavLink>

              {/* Signin/Register link for smaller devices */}
              <NavLink className={"ms-auto me-auto"} to="/signin" style={{ textDecoration: "none" }}>
                <li className="nav-item me-4 d-lg-none d-block">
                  <li className="nav-link">SIGN IN/REGISTER</li>
                </li>
              </NavLink>

              {/* Searchbar for smaller devices */}
              <li className="nav-item mt-3 d-block d-lg-none">
                <form className="d-flex" role="search">
                  <input
                    className="search-expand ms-auto me-auto"
                    type="search"
                    placeholder="    Search for movies, genres and more..."
                    aria-label="Search"
                  />
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
