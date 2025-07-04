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
    {loading && <p>계산 중…</p>}
      {error && <p className="error">오류 발생: {error.message}</p>}
      {!loading && !error && (
        calculationResult != null
          ? <p>계산 결과: {calculationResult}</p>
          : <p>아직 계산된 값이 없습니다.</p>
      )}</div>
  )
}

export default CaculatorLogic