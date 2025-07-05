// src/components/FtaCountryGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ftaCountries from "../../data/ftaCountries";

const FtaCountryGrid = () => {


  return (
    <div className="fta-country-wrapper">
      <h2>FTA 체결 국가</h2>
      <div className="fta-country-grid">
       {ftaCountries.map((country,i)=>(
          <a
            key={i}
            href={country.external}
            target="_blank"
            rel="noopener noreferrer"
            className="fta-country-card"
          >
             <div className="fta-country-icon">
              <img
                src={country.flag}
                alt={country.name}
                className="fta-country-flag"
              />
            </div>
            <p className="fta-country-label">{country.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FtaCountryGrid;
