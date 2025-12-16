import React from "react";
import "./Imageandtext.css";
import image from "../../assets/images/real-estate-6853680_1280.jpg"; // Update with your actual image path
const Imageandtext = () => {
  return (
    <div className="imageandtext-container">
      <div className="text-content">
        <h2 className="heading">Your Trusted Real Estate Partner</h2>
        <p className="description">
          Global1 Realty is a premium real estate provider in USA, offering
          comprehensive property listings, investment opportunities, and expert
          consulting for all your real estate needs.
        </p>
        <div className="stats">
          <div className="stat-item">
            <span className="stat-number">150+</span>
            <span className="stat-label">Proven Expertise</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15</span>
            <span className="stat-label">Trusted by Clients</span>
          </div>
        </div>
      </div>
      <div className="image-content">
        <img src={image} alt="Real Estate" className="image" />
      </div>
    </div>
  );
};

export default Imageandtext;
