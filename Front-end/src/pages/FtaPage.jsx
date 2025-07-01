import React from 'react';
import './FtaPage.css';
import ftaImage from '../assets/image/ftaImage.png'; 
import { useNavigate } from 'react-router-dom';
import ftaCountries from '../data/ftaCountries';
<<<<<<< HEAD
import FtaCountryGrid from '../components/fta/FtaCountryGrid';
=======
>>>>>>> 7e1c996b66a35bf7ef3dd63a22bd9239418fbc9a


// const ftaCountries = [
//   { name: "한-미 FTA", image: "/image/usa.png", route: "/fta/us" },
//   { name: "한-중 FTA", image: "/image/china.png", route: "/fta/china" },
//   { name: "한-EU FTA", image: "/image/eu.png", route: "/fta/eu" },
//   { name: "한-ASEAN FTA", image: "/image/asean.png", route: "/fta/asean" },
//   { name: "한-칠레 FTA", image: "/image/chile.png", route: "/fta/chile" },
//   { name: "한-인도 FTA", image: "/image/india.png", route: "/fta/india" },
// ];

const FtaPage = () => {
    const FtaNavigate = useNavigate();
  return (
    <div className="fta-page-wrapper fade-in">
      <div className="fta-header">
        <img src={ftaImage} alt="FTA 일러스트" className="fta-icon" />
        <h2 className="fta-title">FTA 체결의 의미</h2>
      </div>

      <div className="fta-box">
        <p>
          FTA 체결은 관세 인하를 통해 수출 증대 및 수입 비용 절감, 해외 시장 진출 확대,
          그리고 국가 간 경제 협력 강화 등의 효과를 가져옵니다. 또한, FTA는 국내 산업 경쟁력을
          강화하고, 소비자들에게는 다양한 상품 선택의 기회를 제공합니다.
        </p>
      </div>
     <div className="fta-background-box">
      <FtaCountryGrid></FtaCountryGrid>
      {/* <h2 className="fta-grid-title">체결된 FTA 국가</h2>
      <div className="fta-country-grid">
        {ftaCountries.map((country, idx) => (
          <div
            key={idx}
            className="fta-country-card"
            onClick={() => navigate(country.route)}
          >
            <div className="fta-country-icon">
              <img src={country.flag} alt={country.name} />
            </div>
            <p className="fta-country-label">{country.name}</p>
          </div>
        ))}
      </div> */}
    </div>
    </div>


    

  );
};

export default FtaPage;
