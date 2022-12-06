import './CountryCard.css';
import React from 'react'
//import { Component } from "react";

/*class CountryCard extends Component {

    render() {

        return (
            <div className="CountryCard shadow">
                <img className="CountryCardFlag" src={this.props.countryInfo.flags?.png} alt=""></img>
                <div className="CountryCardSummary">
                    <h3>{this.props.countryInfo.name?.common}</h3>
                    <p>Population: {this.props.countryInfo.population?.toLocaleString()}</p>
                    <p>Region: {this.props.countryInfo.region}</p>
                    <p>Capital: {this.props.countryInfo.capital}</p>
                </div>
            </div>
        );
    }
}*/

export default function CountryCard({ countryInfo, darkMode }) {
    return (
        <div className={"CountryCard shadow " + (darkMode ? "darkElement" : "lightElement")}>
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