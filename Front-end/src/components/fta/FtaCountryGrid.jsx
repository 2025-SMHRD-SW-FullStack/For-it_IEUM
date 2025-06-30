// src/components/FtaCountryGrid.jsx
import React from "react";
import "./FtaCountryGrid.css";
import { useNavigate } from "react-router-dom";

const countries = [
  { id: "us", name: "한-미 FTA", flag: "/flags/us.png" },
  { id: "eu", name: "한-EU FTA", flag: "/flags/eu.png" },
  { id: "cn", name: "한-중 FTA", flag: "/flags/china.png" },
  { id: "au", name: "한-호주 FTA", flag: "/flags/australia.png" },
  { id: "ca", name: "한-캐나다 FTA", flag: "/flags/canada.png" },
  { id: "cl", name: "한-칠레 FTA", flag: "/flags/chile.png" },
];

const FtaCountryGrid = () => {
  const navigate = useNavigate();

  return (
    <div className="fta-country-wrapper">
      <h2>FTA 체결 국가</h2>
      <div className="fta-country-grid">
        {countries.map((country) => (
          <div
            key={country.id}
            className="fta-country-card"
            onClick={() => navigate(`/fta/${country.id}`)}
          >
            <img
              src={country.flag}
              alt={`${country.name} 국기`}
              className="fta-country-flag"
            />
            <div className="fta-country-name">{country.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FtaCountryGrid;
