import './App.css';
import React, { useState } from 'react';
import CountryCards from './Components/CountryCards';
import SearchBar from './Components/SearchBar';
import CountryDetail from './Components/CountryDetail';

function App() {
  const [countries, updateCountries] = useState([]);
  const [darkMode, updateDarkMode] = useState(false);
  const [countryDetail, showCountryDetail] = useState(null);

  // TODO: Look into routing to be able to click on country card?
  // TODO: Show all countries when the page loads

  function toggleDarkMode() {
    console.log("toggling dark mode", darkMode);
    updateDarkMode(a => !a);
  }

  return (
    <div className={"parentDiv "  + (darkMode ? "darkBack" : "lightBack")}>
      <div className={"header shadow " + (darkMode ? "darkElement" : "lightElement")}>
        <h2>Where in the World?</h2>
        <div className="DarkModeButton" onClick={toggleDarkMode}>
          <span><img className="searchIcon" src=".\moontransparent.png"/></span>
          <span className="darkModeText">Dark Mode</span>
        </div>
      </div>
      {
        countryDetail === null 
        ? <div>
          <SearchBar updateCountries={updateCountries} darkMode={darkMode}/>
            <CountryCards countries={countries} darkMode={darkMode} showCountryDetail={showCountryDetail}/>
          </div>
        : <CountryDetail countryInfo={countryDetail} darkMode={darkMode} showCountryDetail={showCountryDetail} />
      }
    </div>
  );
}

export default App;
