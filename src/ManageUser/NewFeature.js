import axios from 'axios';

import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function NewFeature(props) {

  let url = "https://featuremarketplacewebapiforcrud.azurewebsites.net/api/Entity/AddEntity";

  let [user, setUser] = useState({});

  let Navigate = useNavigate();

  const handleChange = (evt) => {

    let { id, value } = evt.target;
    setUser({ ...user, [id]: value });
  }

  const handleClick = () => {

    //console.log(product)
    axios.post(url, user).
      then(resp => {

      }).catch(er => {
        console.log(er);
      })
    Navigate('/SearchUser');
  }

  return (
    <>

<div className='h5 m-4' >Add New Feature</div>
<br />

<div className='container'>
  <div className='row'>
    <div className='col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
      <div className='form-group'>
        <label htmlFor="EntityName">Entity Name</label>
        <input
          type='text'
          className='form-control'
          id="EntityName"
          maxLength="50"
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor="Description">Entity Description</label>
        <input
          type='text'
          className='form-control'
          id="Description"
          maxLength="200"
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor="FeatureName">Feature Name</label>
        <input
          type='text'
          className='form-control'
          id="FeatureName"
          maxLength="50"
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor="FeatureType">Feature Type</label>
        <input
          type='text'
          className='form-control'
          id="FeatureType"
          maxLength="50"
          onChange={handleChange}
        />
      </div>
      <div className='form-group'>
        <label htmlFor="FeatureValue">Feature Value</label>
        <input
          type='text'
          className='form-control'
          id="FeatureValue"
          maxLength="50"
          onChange={handleChange}
        />
      </div>
      <div className='row mt-4 mb-4 m-2'>
        <button
          type='button'
          className='btn btn-primary'
          onClick={handleClick}
        >
          Add Feature
        </button>
      </div>
    </div>
  </div>
</div>

    </>
  )
}
