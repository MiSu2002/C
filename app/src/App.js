import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import MovieDetails from './pages/details/movies/movieDetails';
import Reviews from './pages/details/movies/reviews';
import ActorInfo from './pages/details/actorInfo';
import TVDetails from './pages/details/shows/tvDetails';
import DiscoverMovies from './pages/discover/discoverMovies';
import DiscoverShows from './pages/discover/discoverShows';
import SimilarMovies from './pages/details/movies/similarMovies';
import SimilarShows from './pages/details/shows/similarShows';
import RecommendationsShows from './pages/details/shows/recommendedShows';
import RecommendationsMovies from './pages/details/movies/recommendedMovies.jsx';
import ReviewsShows from './pages/details/shows/reviewsShows';
import Trending from './pages/discover/trending';
import PopularMovies from './pages/discover/popularMovies';
import PopularShows from './pages/discover/popularShows';
import TopRatedMovies from './pages/discover/topRatedMovies';
import TopRatedShows from './pages/discover/topRatedShows';
import UpcomingMovies from './pages/discover/upcomingMovies';
import TodayShows from './pages/discover/airingToday';

function App() {
  return (
      <div className="App">
      <Routes>
      <Route path="/" exact element={<Homepage/>}/>
      <Route path="/movie/:id" element={<MovieDetails/>}/>
      <Route path="/movie/:id/similar" element={<SimilarMovies/>}/>
      <Route path="/movie/:id/reviews" element={<Reviews/>}/>
      <Route path="/actor/:actorId" element={<ActorInfo/>}/>
      <Route path="/tv/:id" element={<TVDetails/>}/>
      <Route path="/tv/:id/similar" element={<SimilarShows/>}/>
      <Route path="/tv/:id/recommendations" element={<RecommendationsShows/>}/>
      <Route path="/movie/:id/recommendations" element={<RecommendationsMovies/>}/>
      <Route path="/tv/:id/reviews" element={<ReviewsShows/>}/>
      <Route path="/movies" element={<DiscoverMovies/>}/>
      <Route path="/shows" element={<DiscoverShows/>}/>
      <Route path="/trending" element={<Trending/>}/>
      <Route path="/popular/movies" element={<PopularMovies/>}/>
      <Route path="/upcoming/movies" element={<UpcomingMovies/>}/>
      <Route path="/top-rated/movies" element={<TopRatedMovies/>}/>
      <Route path="/popular/shows" element={<PopularShows/>}/>
      <Route path="/top-rated/shows" element={<TopRatedShows/>}/>
      <Route path="/airing-today/shows" element={<TodayShows/>}/>
      </Routes>
      </div>
  );
}

export default App;
