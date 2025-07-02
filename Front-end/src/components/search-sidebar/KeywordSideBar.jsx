import React, { useState } from 'react'
import './KeywordSideBar.css'

const KeywordSideBar = () => {

    const keywords = ["전기전자", "의료용품", "가구조명", "생활용품", "의류"];
    const [interest,setInterest] = useState([]);

    const ClickToInterest = (keyword) => {
        if (!interest.includes(keyword)) {
            // 이미 선택된 키워드는 중복 추가 방지
            setInterest([...interest, keyword]);

        } else {
            // 선택된 키워드라면 다시 클릭했을 때 리스트에서 없애기
            const newInterest = interest.filter((i) => i !== keyword);
            setInterest(newInterest);
        }
    }

  return (
    <div>
        <div>
          <b className='keywordLabel'>관심 있는 키워드</b>
          <br />
            {interest.map((keyword, i) => (
              <div 
              className='keyword interest'
              key={i} 
              onClick={() => ClickToInterest(keyword)}
              >{keyword}</div>
            ))}
        </div>
        
      <div>
        <b className='keywordLabel'>분류 리스트</b>
        <br />
        {keywords.map((keyword, i) => (
          <div 
          className={`keyword ${interest.includes(keyword) ? 'interest' : 'keyword'}`}
          key={i} 
          onClick={()=> ClickToInterest(keyword)}
          >
            {keyword}</div>
        ))}
      </div>
    </div>
  )


}

export default KeywordSideBar