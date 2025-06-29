import React, { useState } from 'react'
import '../../styles/TabMenu.css'

const TabMenu = ({activeTab, setActiveTab}) => {

  return (
    <div id='TabMenu'>
        <button 
        className={activeTab === 'tariff' ? 'tab active' : 'tab'}
        onClick={()=> setActiveTab('tariff')}>
          관세비교
        </button>

        <button 
        className={activeTab === 'calculator' ? 'tab active' : 'tab'}
        onClick={()=> setActiveTab('calculator')}>  
          품목계산
        </button>

        <button 
        className={activeTab === 'strategy' ? 'tab active' : 'tab'} 
        id='AITabBtn'
        onClick={()=> setActiveTab('strategy')}>
          AI<br/>전략<br/>추천
        </button>

    </div>
  )
}

export default TabMenu