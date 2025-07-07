import React from 'react';
import './FtaPage.css';
import ftaImage from '../assets/image/ftaImage.png'; 
import { useNavigate } from 'react-router-dom';
import FtaCountryGrid from '../components/fta/FtaCountryGrid';

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
    </div>
    </div>


    

  );
};

export default FtaPage;
