import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import MovieDetails from './pages/movieDetails';
import Reviews from './pages/reviews';
import ActorInfo from './pages/actorInfo';
import TVDetails from './pages/tvDetails';
import DiscoverMovies from './pages/discoverMovies';
import DiscoverShows from './pages/discoverShows';
import SimilarMovies from './pages/similarMovies';
import SimilarShows from './pages/similarShows';
import RecommendationsShows from './pages/recommendedShows';
import RecommendationsMovies from './pages/recommendedMovies.jsx';
import ReviewsShows from './pages/reviewsShows';

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
      </Routes>
      </div>
  );
}

export default App;
