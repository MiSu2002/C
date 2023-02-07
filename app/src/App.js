import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import MovieDetails from './pages/movieDetails';
import Reviews from './pages/reviews';
import ActorInfo from './pages/actorInfo';
import TVDetails from './pages/tvDetails';
import DiscoverMovies from './pages/discoverMovies';
import DiscoverShows from './pages/discoverShows';

function App() {
  return (
      <div className="App">
      <Routes>
      <Route path="/" exact element={<Homepage/>}/>
      <Route path="/movie/:id" element={<MovieDetails/>}/>
      <Route path="/movie/:id/reviews" element={<Reviews/>}/>
      <Route path="/actor/:actorId" element={<ActorInfo/>}/>
      <Route path="/tv/:id" element={<TVDetails/>}/>
      <Route path="/movies" exact element={<DiscoverMovies/>}/>
      <Route path="/shows" exact element={<DiscoverShows/>}/>
      </Routes>
      </div>
  );
}

export default App;
