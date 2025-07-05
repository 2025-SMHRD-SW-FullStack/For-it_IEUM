import React, { useEffect, useState } from 'react'
import useCardStore from '../../../stores/CardStore'
import './CaculatorLogic.css'
import useCalCulStore from '../../../stores/CalculStore';
import { getCalculation } from '../../../services/searchService';

const CaculatorLogic = ({className = '',trigger}) => {

  const { selectedCard } = useCardStore();

  const {quantity, unitPrice, setCalculation} = useCalCulStore();

  const [calculationResult, setCalculationResult] = useState(null);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    if (!selectedCard) return;
    if (quantity == null)  return; 
    if (unitPrice == null) return;

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getCalculation(
          unitPrice,
          quantity,
          selectedCard.base_tariff,
          selectedCard.top10_data[0].name,
          selectedCard.top10_data[0].rate
        );
        setCalculationResult(data.calculation ?? data);
        setCalculation(data.calculation ?? data);
      } catch (err) {
      } finally{
        setLoading(false)
      }
    };

    fetchData();
  }, [trigger, selectedCard, quantity, unitPrice]);

  return (
    <div className={`logic ${className}`} style={{ whiteSpace: 'pre-line' }}> 
    {loading && <div>계산 중…</div>}
      {error && <div className="error">오류 발생: {error.message}</div>}
      {!loading && !error && (
        calculationResult != null
          ? <div>
              <strong>계산 결과</strong>
              <br/>
              {calculationResult}
            </div>
          : <div>아직 계산된 값이 없습니다.</div>
      )}</div>
  )
}

export default CaculatorLogic