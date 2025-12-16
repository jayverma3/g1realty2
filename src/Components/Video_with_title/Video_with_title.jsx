import React from "react";
import "./Video_with_title.css";
import "./Bubbles.css";
import girlArciVideo from "../../assets/videos/girl_arci.mp4";
import SearchBar from "../SearchBar/SearchBar";
import { Link } from "react-router-dom";

const VideoWithTitle = () => {
  return (
    <section className="video-section">
      <div className="bubbles-container">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      <video className="background-video" autoPlay muted loop>
        <source src={girlArciVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay">
        <div className="title-container">
          <h1 className="vwt-h1">
            Welcome To <br />
            Global 1 Realty
          </h1>
          <h2 className="vwt-h2">Making real estate real easy.</h2>
        </div>

        <div className="button-group">
          <button className="btn contact-btn">
            <Link className="btn-link-home" to="/contact">
              Contact
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
};

export default VideoWithTitle;
