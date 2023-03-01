import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar(props) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/search-results/${query}`);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={props.placeholder}
        className="searchbar ms-4 d-none d-lg-block"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
    <form onSubmit={handleSearch}>
    <input
        type="text"
        placeholder={props.placeholder}
        className="search-expand ms-auto me-auto d-block d-lg-none"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
    </div>
  );
}

export default SearchBar;