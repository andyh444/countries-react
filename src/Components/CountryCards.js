import React from 'react'
import CountryCard from './CountryCard'

export default function CountryCards({ countries, darkMode }) {
    return (
        countries.map((x, i) =>
        {
            return <CountryCard key={i} countryInfo={x} darkMode={darkMode} />
        }
        ));
}