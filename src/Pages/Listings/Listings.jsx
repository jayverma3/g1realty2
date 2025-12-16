import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Listing from '../../Components/Listing/Listing';
import listingsData from '../../data/listings.json';
import useDebounce from '../../hooks/useDebounce';
import './Listings.css';

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [listings, setListings] = useState(listingsData);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const filteredListings = listingsData.filter((listing) =>
      listing.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setListings(filteredListings);
  }, [debouncedSearchTerm]);

  return (
    <div className="listings-page">
      <Header />
      <div className="search-section">
        <div className="search-header">
          <h1 className="search-title">Find Your Next Home</h1>
          <p className="search-subtitle">Search through our exclusive listings to find the property of your dreams.</p>
        </div>
        <SearchBar onSearch={setSearchTerm} />
      </div>
      <div className="listings-content">
        <Listing listings={listings} />
      </div>
      <Footer />
    </div>
  );
};

export default Listings;