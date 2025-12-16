import React, { useState } from 'react';
import './SearchBar.css';
import searchIcon from '../../assets/icons/search.svg';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (onSearch) {
      onSearch(newQuery);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // This could be used for an explicit search action if needed
    console.log('Search submitted:', query);
  };

  return (
    <div className="search-bar-wrapper">
      <div className="bubbles-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <img src={searchIcon} alt="Search" className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for listings, locations, or agents..."
            value={query}
            onChange={handleInputChange}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
