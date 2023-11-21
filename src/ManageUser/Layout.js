import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FeatureHome from "./FeatureHome";
import ViewFeature from "./ViewFeature"
import SearchUser from './SearchUser';
import NewFeature from './NewFeature';
import axios from 'axios';
import { AppConfigurationClient } from "@azure/app-configuration";


import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import SearchResult from './SearchResult';

//import EditFeature from './EditFeature';
//import PageNotFound from './PageNotFound';

  
export default function Layout() {

  const [featureFlags, setFeatureFlags]=useState({
        isAdminOptionsEnabled:false,
        addFeatureOption:false,
        updateFeatureOption:false,
        favouritesOption:false,
        myFeaturesOption:false,
       });
       
    
        const fetchFeatureFlags = async () => {
          try {
            const isAdminOptionsEnabledResponse = await configService.getConfigurationSetting({
              key: '.appconfig.featureflag/isAdminOptionsEnabled',
            });
           
            const addFeatureOptionResponse = await configService.getConfigurationSetting({
              key: '.appconfig.featureflag/addFeatureOption',
            });
            const updateFeatureOptionResponse = await configService.getConfigurationSetting({
              key: '.appconfig.featureflag/updateFeatureOption',
            });
            const favouritesOptionResponse = await configService.getConfigurationSetting({
              key: '.appconfig.featureflag/favouritesOption',
            });
            const myFeaturesOptionResponse = await configService.getConfigurationSetting({
              key: '.appconfig.featureflag/myFeaturesOption',
            });
    
            setFeatureFlags({
              isAdminOptionsEnabled: JSON.parse(isAdminOptionsEnabledResponse?.value)?.enabled === true,
              addFeatureOption: JSON.parse(addFeatureOptionResponse?.value)?.enabled === true,
              updateFeatureOption: JSON.parse(updateFeatureOptionResponse?.value)?.enabled === true,
              favouritesOption: JSON.parse(favouritesOptionResponse?.value)?.enabled === true,
              myFeaturesOption: JSON.parse(myFeaturesOptionResponse?.value)?.enabled === true,
            });
          } catch (error) {
            console.error('Error fetching feature flags:', error);
          }
        };
        useEffect(() => {
    
        fetchFeatureFlags();
        
         // Polling every 5 seconds (adjust as needed)
         const pollingInterval = setInterval(fetchFeatureFlags, 1000);
    
         return () => clearInterval(pollingInterval);
    
      }, []);

  const [searchResults, setSearchResults] = useState([]);  
  const [searchTerm, setSearchTerm] = useState('');
  
  async function SearchAPI() {
    const response = await axios.get(`https://featuremarketplacewebapiforcrud.azurewebsites.net/api/Entity/GetEntityByEntityName/${searchTerm}`);
    setSearchResults(response.data);
    
    
  }

  function HandleInputChange(event) {
    setSearchTerm(event.target.value);
  }
  return (

    <BrowserRouter>
      <>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container fluid>
            <Navbar.Brand href="/">Feature Marketplace</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >

            {featureFlags.addFeatureOption ?(
                <Nav.Link href="./NewFeature">Add Feature</Nav.Link>
                  ):(
                    <p></p>
                 )}

            {featureFlags.updateFeatureOption ?(
                <Nav.Link href="#action2">Upload Feature</Nav.Link>
               ):(
                    <p></p>
                 )}

            {featureFlags.favouritesOption ?(
                <Nav.Link href="#action1">Favourites</Nav.Link>
               ):(
                    <p></p>
                 )}

          {featureFlags.myFeaturesOption ?(
                <Nav.Link href="/">My Feature</Nav.Link>
             ):(
                    <p></p>
                 )}

          {featureFlags.isAdminOptionsEnabled ?(
                <Nav.Link href="./SearchUser">Custom Search</Nav.Link>
            ):(
                    <p></p>
                 )}

              </Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={HandleInputChange}
                />
                <Link to="searchresult" >
                  <Button variant="outline-success" onClick={SearchAPI} >Search</Button>
                  </Link>
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>

      
      

      <Routes>
        <Route path='/' element={<FeatureHome></FeatureHome>} ></Route>
        <Route path='./searchuser' element={<SearchUser ></SearchUser>} ></Route>
        <Route path='/searchresult' element={<SearchResult ></SearchResult>} ></Route>
        <Route path='./newfeature' element={<NewFeature ></NewFeature>} ></Route>
        <Route path='viewfeature' element={<ViewFeature></ViewFeature>} ></Route>

      </Routes>
      
      </>
      <SearchResult data={searchResults}/>
    </BrowserRouter>
  )
}
