import './SearchBar.css';
import React, { useRef, useState } from 'react'

export default function SearchBar({ updateCountries, darkMode }) {
    const COUNTRY_NAME = "Country Name";
    const POPULATION_ASC = "Population (small to large)";
    const POPULATION_DESC = "Population (large to small)";

    const ALL = "All";

    const SEARCH_ALL_COUNTRIES_URL = "https://restcountries.com/v3.1/all";
    const SEARCH_ONE_COUNTRY_URL_PREFIX = "https://restcountries.com/v3.1/name/";

    const countrySearchField = useRef(0);
    const areaFilterField = useRef(1);
    const sortField = useRef(2);
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);

    function inputKeyPressed(event) {
        if (event.key === "Enter") {
          searchCountries();
        }
      }

    async function searchCountries() {
      const search = countrySearchField.current.value;
      var url;
      if (search === null
        || search === '') {
          url = SEARCH_ALL_COUNTRIES_URL;
      }
      else {
        url = SEARCH_ONE_COUNTRY_URL_PREFIX + search;
      }
      await searchCountries2(url);
    }

    async function searchCountries2(url) {
      let x = await fetch(url);
      if (!x.ok) {
        console.warn("search failed", x);
        updateCountries([]);
      }
      else {
        let json = await x.json();
        updateCountries(filterAndSortCountries(json));
      }
    }

    function filterAndSortCountries(countries) {
      const filtered = filterCountries(countries);
      const countryComparisonValueGetter = GetCountryComparisonValue();
      if (countryComparisonValueGetter === null) {
        return filtered;
      }
      return filtered.sort((a, b) => {
        let aName = countryComparisonValueGetter(a);
        let bName = countryComparisonValueGetter(b);

        if (aName < bName) {
          return -1;
        }
        if (aName > bName) {
          return 1;
        }
        return 0;
      });
    }

    function GetCountryComparisonValue() {
      switch (sortField.current.value) {
        case COUNTRY_NAME:
          return (x) => {return x.name.common; };
        case POPULATION_ASC:
          return (x) => {return x.population; };
        case POPULATION_DESC:
          return (x) => {return -x.population; };
      }
      return null;
    }

    function filterCountries(countries) {
      if (areaFilterField.current.value === ALL) {
        return countries;
      }
      return countries.filter(x => {
        return x.region === areaFilterField.current.value;
      });
    }

    if (!firstTimeLoaded) {
      searchCountries2(SEARCH_ALL_COUNTRIES_URL);
      setFirstTimeLoaded(true);
    }
    return (
        <div className="searchMenu">
          <div className="searchMenuSection leftSection">
            <div className={"searchBarContainer shadow inputContainer " + ((darkMode ? "darkElement" : "lightElement"))}>
              <img onClick={searchCountries} className="searchIcon" src="https://openclipart.org/image/2400px/svg_to_png/213239/Search-icon.png" />
              <input className={(darkMode ? "darkElement" : "lightElement")} ref={countrySearchField} placeholder="Search for a country..." type="text" onKeyUp={inputKeyPressed}></input>
            </div>
          </div>
          <div className={'searchMenuSection rightSection' + (darkMode ? "darkElement" : "lightElement")}>
            <label className={(darkMode ? "darkElement" : "lightElement")}>Region:</label>
            <select onChange={searchCountries} className={"inputContainer shadow " + (darkMode ? "darkElement" : "lightElement")}  ref={areaFilterField}>
                <option>{ALL}</option>
                <option>Africa</option>
                <option>Americas</option>
                <option>Asia</option>
                <option>Europe</option>
                <option>Oceania</option>
                <option>Antarctic</option>
            </select>
            <label className={(darkMode ? "darkElement" : "lightElement")}>Sort By:</label>
            <select onChange={searchCountries} className={"inputContainer shadow " + (darkMode ? "darkElement" : "lightElement")} ref={sortField}>
              <option>{COUNTRY_NAME}</option>
              <option>{POPULATION_ASC}</option>
              <option>{POPULATION_DESC}</option>
            </select>
          </div>
        </div>
        );
}