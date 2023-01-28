import './App.css';
import { Routes, Route } from "react-router-dom";
import Homepage from './pages/Homepage';
import MovieDetails from './pages/movieDetails';

function App() {
  return (
      <div className="App">
      <Routes>
      <Route path="/" exact element={<Homepage/>}/>
      <Route path="/movie/:id" element={<MovieDetails/>}/>
      </Routes>
      </div>
  );
}

export default App;
