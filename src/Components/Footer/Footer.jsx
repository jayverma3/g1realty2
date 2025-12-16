import React from "react";
import "./Footer.css";
import facebookIcon from "../../assets/icons/icons8-facebook.svg";
import instagramIcon from "../../assets/icons/icons8-instagram.svg";
import linkedinIcon from "../../assets/icons/icons8-linkedin-circled.svg";
import xIcon from "../../assets/icons/icons8-x.svg";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="bubbles-container">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>
      <div className="footer-section services">
        <h3 className="footer-heading">Services</h3>
        <p className="footer-description">
          Comprehensive property solutions for all needs.
        </p>
        <div className="social-icons">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            target="_blank"
            rel="noreferrer"
          >
            <img src={facebookIcon} alt="Facebook" className="social-icon" />
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            target="_blank"
            rel="noreferrer"
          >
            <img src={instagramIcon} alt="Instagram" className="social-icon" />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
          >
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
          </a>
          <a
            href="https://twitter.com"
            aria-label="X"
            target="_blank"
            rel="noreferrer"
            className="x-icon"
          >
            <img src={xIcon} alt="X" className="social-icon" />
            <span className="notification-badge">!</span>
          </a>
        </div>
        <p className="copyright">© 2025. All rights reserved.</p>
      </div>
      <div className="footer-section investments">
        <h3 className="footer-heading">CONTACT</h3>
        <p>734 328-2117</p>
        <p>contact@global1realty.com</p>
      </div>
      <div className="footer-section consulting">
        <h3 className="footer-heading">CONSULTING</h3>
        <form className="consulting-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Your email for contact"
            aria-label="Email address"
            required
          />
          <button type="submit">Submit your inquiry now</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
