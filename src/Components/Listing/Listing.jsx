import React from 'react';
import { Link } from 'react-router-dom';
import './Listing.css';
import bedIcon from '../../assets/icons/bed.svg';
import bathIcon from '../../assets/icons/bath.svg';
import areaIcon from '../../assets/icons/area.svg';

const Listing = ({ listings }) => {
  return (
    <div className="listing-container">
      {listings.map((listing) => (
        <Link to={`/listing/${listing.id}`} key={listing.id} className="listing-card-link">
          <div className="listing-card">
            <div className="listing-image-container">
              <img src={listing.image} alt={listing.title} className="listing-image" />
              <div className="listing-price">${listing.price}</div>
            </div>
            <div className="listing-details">
              <h3 className="listing-title">{listing.title}</h3>
              <p className="listing-address">{listing.address}</p>
              <div className="listing-specs">
                <div className="spec-item">
                  <img src={bedIcon} alt="Bedrooms" className="spec-icon" />
                  <span>{listing.bedrooms} beds</span>
                </div>
                <div className="spec-item">
                  <img src={bathIcon} alt="Bathrooms" className="spec-icon" />
                  <span>{listing.bathrooms} baths</span>
                </div>
                <div className="spec-item">
                  <img src={areaIcon} alt="Area" className="spec-icon" />
                  <span>{listing.area}</span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Listing;
