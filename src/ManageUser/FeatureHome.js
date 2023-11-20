import React from 'react';
import './FeatureHome.css';

import { useState, useEffect } from 'react';
import axios from 'axios';
import MyFeatures from './MyFeatures';

const GridBox = ({ entity }) => {

  return (
    <div className="grid-box">
      <h3>{entity.entityName}</h3>
      <p>{ entity.description}</p>
      <a href={"/"} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  );
};
const FeatureHome = () => {

  let [entities, setEntities] = useState([]);
  useEffect(() => {
    axios.get("https://featuremarketplacewebapiforcrud.azurewebsites.net/api/Entity/getallentities")
      .then(resp => {
        setEntities(resp.data)
        //console.log(resp.data);
      })
      .catch(err => {
      })
    return()=>{

    }
  },[])
  const gridData = entities;
  console.log(gridData);


  return (
    <>
      <div className="landing-page">
        <div className="grid-container">
          <div className="grids">
            <h2>Popular Entities</h2>
            <div className="grid-group scrollable-grid-group">
              {gridData.map((entity, index) => (
                <GridBox key={index} entity={entity} />
              ))}
            </div>
          </div>
        </div>
      </div>


      <div className="landing-page">
        <div className="table-container">
          <MyFeatures></MyFeatures>
          
        </div>
      </div>

      <br></br>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123 456 789</p>
          </div>
          <div className="footer-section">
            <h3>Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
         
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 Team1 Website. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default FeatureHome;
