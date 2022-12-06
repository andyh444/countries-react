import './App.css';
import React, { useState } from 'react';
import CountryCards from './Components/CountryCards';
import SearchBar from './Components/SearchBar';

function App() {
  const [countryInfo, updateCountries] = useState([]);
  const [darkMode, updateDarkMode] = useState(false);

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
      <SearchBar updateCountries={updateCountries} darkMode={darkMode}/>
      <div>
        <CountryCards countries={countryInfo} darkMode={darkMode}/>
      </div>
    </div>
  );
}

export default App;
