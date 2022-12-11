import './CountryCard.css';
import React from 'react'

export default function CountryCard({ countryInfo, darkMode, showCountryDetail }) {
    return (
        <div onClick={() => showCountryDetail(c => countryInfo)} className={"CountryCard shadow " + (darkMode ? "darkElement" : "lightElement")}>
            <img className="CountryCardFlag" src={countryInfo.flags?.png} alt=""></img>
            <div className="CountryCardSummary">
                <h3>{countryInfo.name?.common}</h3>
                <p><b>Population</b>: {countryInfo.population?.toLocaleString()}</p>
                <p><b>Region</b>: {countryInfo.region}</p>
                <p><b>Capital</b>: {countryInfo.capital}</p>
            </div>
        </div>
    );
}