import React from 'react';
import { useParams } from 'react-router-dom';
import listings from '../../data/listings.json';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ListingDetail.css';
import bedIcon from '../../assets/icons/bed.svg';
import bathIcon from '../../assets/icons/bath.svg';
import areaIcon from '../../assets/icons/area.svg';

const ListingDetail = () => {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === parseInt(id));

  if (!listing) {
    return (
      <>
        <Header />
        <div className="listing-not-found">Listing not found</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="listing-detail-page">
        <div className="detail-header">
          <div className="detail-header-info">
            <h1 className="detail-title">{listing.title}</h1>
            <p className="detail-address">{listing.address}</p>
          </div>
          <div className="detail-header-price">
            <h2 className="detail-price">${listing.price}</h2>
          </div>
        </div>

        <div className="detail-gallery">
          <img src={listing.image} alt={listing.title} className="detail-main-image" />
          {/* Add more images here if available */}
        </div>

        <div className="detail-body">
          <div className="detail-description-container">
            <h3 className="detail-section-title">Description</h3>
            <p className="detail-description">{listing.description}</p>
          </div>

          <div className="detail-sidebar">
            <div className="detail-specs-card">
              <h3 className="detail-section-title">Property Details</h3>
              <div className="detail-specs">
                <div className="detail-spec-item">
                  <img src={bedIcon} alt="Bedrooms" className="detail-spec-icon" />
                  <div>
                    <strong>{listing.bedrooms}</strong>
                    <span>Bedrooms</span>
                  </div>
                </div>
                <div className="detail-spec-item">
                  <img src={bathIcon} alt="Bathrooms" className="detail-spec-icon" />
                  <div>
                    <strong>{listing.bathrooms}</strong>
                    <span>Bathrooms</span>
                  </div>
                </div>
                <div className="detail-spec-item">
                  <img src={areaIcon} alt="Area" className="detail-spec-icon" />
                  <div>
                    <strong>{listing.area}</strong>
                    <span>Sqft</span>
                  </div>
                </div>
              </div>
              <button className="btn request-info-btn">Request Info</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListingDetail;
