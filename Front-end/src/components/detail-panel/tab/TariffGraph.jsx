import React, { PureComponent } from 'react';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import useCardStore from '../../../stores/CardStore';
import testItemArray from '../../../data/testItemArray';
import './TariffGraph.css'

const TariffGraph = ({ overrideData = null }) => {

  const { selectedCard } = useCardStore(); 

  const cardData = overrideData || selectedCard;

  if (!cardData) return null;

  const selectedItem = testItemArray.find((item)=> item.hs_code === cardData.hs_code);
  if(!selectedItem) return <p>그래프 데이터를 찾을 수 없습니다.</p>;

  const charData = [
    {name: '기본 관세', value: selectedItem.baseTariff , fill: '#CFE8FC' },
    {name: '최저 관세', value: selectedItem.lowestTariff, fill: '#63B5F5'}
  ]
  
  return (
    <div className='tariffGraph'>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charData}>
                <XAxis dataKey="name" />
                <YAxis domain={[0, 'dataMax + 2']}/>
                <Tooltip />
                <Bar dataKey="value" barSize={60} >
                    <LabelList dataKey="value" position="top" formatter={(value) => `${value}%`} />
                    {charData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Bar>
            </BarChart> 
        </ResponsiveContainer>
    </div>
  )
}

export default TariffGraph