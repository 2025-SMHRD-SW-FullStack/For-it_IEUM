// src/components/FtaCountryGrid.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ftaCountries from "../../data/ftaCountries";

const FtaCountryGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="fta-country-wrapper">
      <h2>FTA 체결 국가</h2>
      <div className="fta-country-grid">
       {ftaCountries.map((country)=>(
          <div
            key={country.id}
            className="fta-country-card"
            onClick={() => navigate(country.route)}
          >
             <div className="fta-country-icon">
              <img
                src={country.flag}
                alt={country.name}
                className="fta-country-flag"
              />
            </div>
            <p className="fta-country-label">{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FtaCountryGrid;
