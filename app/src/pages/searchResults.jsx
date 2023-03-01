import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_KEY } from '../utils/constants';
import { useParams } from 'react-router-dom';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

function SearchResults() {
  const { query } = useParams();
  const [results, setResults] = useState([]);
  const [index, setIndex] = useState(1);
  const [page, setPage] = useState();

  useEffect(() => {
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&page=${index}`),
      axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${query}&include_adult=false&page=${index}`),
      axios.get(`https://api.themoviedb.org/3/search/keyword?api_key=${API_KEY}&query=${query}&include_adult=false&page=${index}`),
    ]).then(([moviesResponse, tvResponse, keywordResponse]) => {
      const movies = moviesResponse.data.results.map(result => ({
        id: result.id,
        poster_path: result.poster_path,
        title: result.title,
        overview: result.overview,
        media_type: 'movie',
      }));
      const tvShows = tvResponse.data.results.map(result => ({
        id: result.id,
        poster_path: result.poster_path,
        title: result.name,
        overview: result.overview,
        media_type: 'tv',
      }));
      const keyword = keywordResponse.data.results.map(result => ({
        id: result.id,
        poster_path: result.poster_path,
        title: result.title,
        overview: result.overview,
        media_type: 'movie' || 'tv',
      }));
      // Get ratings for each movie and TV show
      const moviePromises = movies.map(movie => axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&language=en-US`));
      const tvPromises = tvShows.map(tv => axios.get(`https://api.themoviedb.org/3/tv/${tv.id}?api_key=${API_KEY}&language=en-US`));
      Promise.all([...moviePromises, ...tvPromises]).then(responses => {
        const resultsWithRatings = responses.map(response => {
          const { id, vote_average } = response.data;
          return { id, vote_average };
        });
        // Merge ratings with movies and TV shows
        const resultsWithRatingsById = resultsWithRatings.reduce((obj, item) => {
          obj[item.id] = item;
          return obj;
        }, {});
        const mergedResults = [...movies, ...tvShows, ...keyword].map(result => ({
          ...result,
          rating: resultsWithRatingsById[result.id] ? resultsWithRatingsById[result.id].vote_average : null,
        }));
        // Sort results by rating in descending order
        const sortedResults = mergedResults.sort((a, b) => b.rating - a.rating);
        setResults(sortedResults);
        setPage(Math.max(moviesResponse.data.total_pages, tvResponse.data.total_pages, keywordResponse.data.total_pages));
      });
    }).catch(error => {
      console.error(error);
    });
  }, [query, index]);

  const handlePreviousPage = () => {
    if (index > 1) {
      setIndex(index - 1);
    }
  };

  const handleNextPage = () => {
    if (index < page) {
      setIndex(index + 1);
    }
  };

  return (
    <div style={{fontFamily: 'Montserrat'}}>
      <Navbar/>
      <h4 className='row search-content mx-auto mt-5 text-white'>Results for {query} :</h4>
      {results.map(result => (
        <div key={`${result.media_type}-${result.id}`}>
          {result.poster_path && result.title && result.overview && result.media_type === 'movie' ? (
            <Link to={`/movie/${result.id}`} style={{textDecoration: 'none'}}>
            <div className="row search-content mt-5 mb-5 mx-auto" style={{backgroundColor: '#2a2a479a'}}>
              <div className="col col-sm-5 col-md-4 col-lg-3 col-xxl-2 mt-3 mb-3 ms-3 d-flex justify-content-center">
                <img style={{width: '18vh', height: '25vh'}}
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={result.title}
                />
              </div>
              <div className="col mt-3 mb-3">
                <h3 className='trailer-link me-3'>{result.title}</h3>
                <p className='overview mt-3 me-3' style={{maxHeight: '20vh', overflow: 'hidden', lineHeight: '2'}}>{result.overview}</p>
                <p className='overview'>...</p>
                <p className='overview mt-3' style={{color: '#FA9'}}>Movie</p>
              </div>
            </div>
            </Link>
          ) : null}
          {result.poster_path && result.title && result.overview && result.media_type === 'tv' ? (
            <Link to={`/tv/${result.id}`} style={{textDecoration: 'none'}}>
            <div className="row search-content mt-5 mb-5 mx-auto" style={{backgroundColor: '#2a2a479a'}}>
              <div className="col col-sm-5 col-md-4 col-lg-3 col-xxl-2 mt-3 mb-3 ms-3 d-flex justify-content-center">
                <img style={{width: '18vh', height: '25vh'}}
                  src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                  alt={result.title}
                />
              </div>
              <div className="col mt-3 mb-3">
                <h3 className='trailer-link me-3'>{result.title}</h3>
                <p className='overview mt-3 me-3' style={{maxHeight: '20vh', overflow: 'hidden', lineHeight: '2'}}>{result.overview}</p>
                <p className='overview'>...</p>
                <p className='overview mt-3' style={{color: '#FA9'}}>TV / Show</p>
              </div>
            </div>
            </Link>
          ) : null}
        </div>
      ))}
      <div className="d-flex justify-content-between align-items-center mt-3 mb-5">
        <button className="ms-4 ms-md-5 btn btn-dark" onClick={handlePreviousPage}>Previous</button>
        <p className="text-secondary mt-3">Page {index} / {page}</p>
  <button className="me-4 me-md-5 btn btn-dark" onClick={handleNextPage}>Next</button>
</div>
        <Footer/>
      </div>
    );
  }

export default SearchResults;