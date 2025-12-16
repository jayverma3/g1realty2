import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo_final.png"; // Update with your actual logo path
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isTop ? "header--transparent" : ""}`}>
      <div className="header__logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Global1 Realty Logo" className="logo" />
        </Link>
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
        <div className="hamburger-line"></div>
      </div>

      <nav className="header__nav">
        <ul className={`nav__list ${isMenuOpen ? "open" : ""}`}>
          <li className={`nav__item ${isActive("/")}`}>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className={`nav__item ${isActive("/about")}`}>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
          </li>
          <li className={`nav__item ${isActive("/listings")}`}>
            <Link to="/listings" onClick={closeMenu}>
              Listings
            </Link>
          </li>
          <li className={`nav__item ${isActive("/teams")}`}>
            <Link to="/teams" onClick={closeMenu}>
              Teams
            </Link>
          </li>
          <li className={`nav__item ${isActive("/contact")}`}>
            <Link to="/contact" onClick={closeMenu}>
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
