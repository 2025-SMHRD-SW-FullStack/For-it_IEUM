import { useState } from "react";
import apiClient from "../lib/apiClient";

export const chatGPTItem = async (selectedCard) => {
    
    // const [rank,setRank] =useState();

    // 1) 빈 문자열로 초기화
let accumulated = '';

// 2) for 문 돌면서 하나씩 붙이기
for (let i = 0; i < selectedCard.top10_data.length; i++) {
    accumulated += selectedCard.top10_data[i].name;
    if (i !== selectedCard.top10_data.length - 1) {
    accumulated += ', ';
    }
    accumulated += selectedCard.top10_data[i].rate;
  // 아이템 사이에 구분자를 넣고 싶으면 예를 들어 콤마+스페이스도 추가
  // 아이템 사이에 구분자를 넣고 싶으면 예rate 콤마+스페이스도 추가
    if (i !== selectedCard.top10_data.length - 1) {
    accumulated += ', ';
    }
}

    const prompt = `${selectedCard.product_name},${selectedCard.hs_code},${selectedCard.base_tariff},${accumulated}`
        
    const res = await apiClient.post('/api/chat', { 
        prompt
    });
    return res.data;
};