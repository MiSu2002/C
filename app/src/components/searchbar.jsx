import { useState } from 'react';

function SearchBar(props) {
  const [query, setQuery] = useState('');

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <form action={`/search-results/${query}`} method='get'>
        <input type="text" value={query} onChange={handleInputChange} placeholder={props.placeholder} className="searchbar ms-4 d-none d-lg-block"/>
      </form>

      <form action={`/search-results/${query}`} method='get'>
        <input type="text" value={query} onChange={handleInputChange} placeholder={props.placeholder} className="search-expand ms-auto me-auto d-block d-lg-none"/>
      </form>
    </div>
  );
}

export default SearchBar;