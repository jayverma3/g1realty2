import React from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import RealtorList from '../../Components/RealtorList/RealtorList';
import './Realtors.css';

const Realtors = () => {
  return (
    <div className="realtors-page">
      <Header />
      <div className="realtors-content">
        <h1>Meet Our Agents</h1>
        <p>Our dedicated team of professionals is here to help you with all your real estate needs.</p>
        <RealtorList />
      </div>
      <Footer />
    </div>
  );
};

export default Realtors;
