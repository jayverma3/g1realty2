import React from "react";
import "./ScrollingLogos.css";

const logos = [
  "/path/to/logo1.png",
  "/path/to/logo2.png",
  "/path/to/logo3.png",
  "/path/to/logo4.png",
  "/path/to/logo5.png",
];

const ScrollingLogos = () => {
  // Repeat logos 3 times for seamless infinite scroll
  const repeatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="scrolling-logos-container">
      <h2 className="scrolling-logos-title">OUR CLIENTS</h2>
      <div className="scrolling-logos-wrapper">
        <div className="scrolling-logos">
          {repeatedLogos.map((logo, index) => (
            <div className="logo-item" key={index}>
              <img src={logo} alt={`Client logo ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollingLogos;
