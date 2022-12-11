import './CountryDetail.css';
import React, { useState } from 'react'

export default function CountryDetail({ countryInfo, darkMode, showCountryDetail }) {
    const [borderCountries, setBorderCountries] = useState([]);
    const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);

    async function updateBorderCountries() {
        if (countryInfo.borders.length == 0) {
            return;
        }
        const url = "https://restcountries.com/v3.1/alpha?codes=" + countryInfo.borders.join(",");
        let x = await fetch(url);
        if (!x.ok) {
            console.warn("search failed", x);
            setBorderCountries([]);
        }
        else {
            let json = await x.json();
            setBorderCountries(json);
        }
    }
    if (!firstTimeLoaded) {
        updateBorderCountries();
        setFirstTimeLoaded(true);
    }

    function getBorderCountryButtons() {
        if (borderCountries.length == 0) {
            return <div>Loading border countries...</div>
        }
        return borderCountries.map((x, i) =>
        {
            return <button key={i} onClick={() => { showCountryDetail(y => x); setBorderCountries([]); setFirstTimeLoaded(false);}} className={'borderCountryButton shadow ' + (darkMode ? "darkElement" : "lightElement")}>{x.name?.common}</button>
        });
    }

    return (
        <div>
            <div>
                <button className={'backButton shadow ' + (darkMode ? "darkElement" : "lightElement")} onClick={() => showCountryDetail(x => null)}>Back</button>
            </div>
            <div className='countryDetailSection'>
                <img className='countryDetailFlag' src={countryInfo.flags?.svg} alt=""></img>
            </div>
            <div className={'countryDetailSection '  + (darkMode ? "darkElement" : "lightElement")}>
                <h3>{countryInfo.name?.common}</h3>
                <div className='countryDetailSubsection'>
                    <p><b>Native Name: </b>{countryInfo.name.nativeName[Object.keys(countryInfo.name.nativeName)[0]].common}</p>
                    <p><b>Population</b>: {countryInfo.population?.toLocaleString()}</p>
                    <p><b>Region</b>: {countryInfo.region}</p>
                    <p><b>Sub Region</b>: {countryInfo.subregion}</p>
                    <p><b>Capital</b>: {countryInfo.capital}</p>
                </div>
                <div className='countryDetailSubsection'>
                <p><b>Top Level Domain</b>: {countryInfo.tld}</p>
                <p><b>Currencies</b>: {Object.keys(countryInfo.currencies).map(x => { return countryInfo.currencies[x].name;}).join(", ")}</p>
                <p><b>Languages</b>: {Object.keys(countryInfo.languages).map(x => { return countryInfo.languages[x];}).join(", ")}</p>
                </div>
                <div className='borderCountries'>
                    {
                        countryInfo.borders?.length > 0
                        ? <div>
                            <span><b>Border Countries:</b></span>
                            {getBorderCountryButtons()}
                        </div>
                        : <div>No border countries</div>
                    }
                </div>
            </div>
        </div>
    )
}