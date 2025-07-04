import React, { PureComponent } from 'react';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import useCardStore from '../../../stores/CardStore';
import testItemArray from '../../../data/testItemArray';
import './TariffGraph.css'

const TariffGraph = ({ overrideData = null }) => {

  const { selectedCard } = useCardStore();
  const card = overrideData || selectedCard;
  if (!card) return null;

  if (!card) return <p>그래프 데이터를 찾을 수 없습니다.</p>;
  
  const rawBaseTariff    = card.base_tariff    ?? 0;
  const rates         = Array.isArray(card.top10_data)
                        ? card.top10_data.map(i => i.rate ?? 0)
                        : [];
  const rawLowestTariff  = rates.length > 0
                        ? Math.min(...rates)
                        : card.lowestTariff ?? 0;

  const baseTariff   = rawBaseTariff   * 100;
  const lowestTariff = rawLowestTariff * 100;
  
  const chartData = [
    { name: '기본 관세', value: baseTariff, fill: '#CFE8FC'},
    { name: '최저 관세', value: lowestTariff, fill: '#63B5F5' }
  ];

  return (
    <div className='tariffGraph'>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 2']}/>
                <Tooltip />
                <Bar dataKey="value" barSize={60} >
                    <LabelList dataKey="value" position="top" formatter={(value) => `${value}%`} />
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart> 
        </ResponsiveContainer>
    </div>
  )
}

export default TariffGraph