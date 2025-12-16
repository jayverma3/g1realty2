import React from 'react';
import realtors from '../../data/realtors.json';
import './RealtorList.css';

const RealtorList = () => {
  return (
    <div className="realtor-list-container">
      {realtors.map((realtor) => (
        <div key={realtor.id} className="realtor-card">
          <img src={realtor.image} alt={realtor.name} className="realtor-image" />
          <div className="realtor-details">
            <h3>{realtor.name}</h3>
            <p>{realtor.title}</p>
            <p>{realtor.phone}</p>
            <p>{realtor.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealtorList;
