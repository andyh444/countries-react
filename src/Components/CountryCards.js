import React from 'react'
import CountryCard from './CountryCard'

export default function CountryCards({ countries, darkMode, showCountryDetail }) {

    function getCountryCards() {
        return (
            countries.map((x, i) =>
            {
                return <CountryCard key={i} countryInfo={x} darkMode={darkMode} showCountryDetail={showCountryDetail} />
            }
            ));
    }

    function getCountriesShownLabel() {
        if (countries.length > 0) {
            return <p style={{margin: 16 + "px"}}>Showing {countries.length} countries</p>;
        }
        return <p style={{margin: 16 + "px"}}>No countries found</p>;
    }

    return (
        <div>
            {getCountriesShownLabel()}
            <div>
                {getCountryCards()}
            </div>
        </div>
    )
}