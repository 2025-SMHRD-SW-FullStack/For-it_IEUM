import React, { useState } from 'react';
import { useBookmarkStore } from '../stores/BookMarkStore';

const BookmarkDetail = ({ bookmark }) => {
  const [showCalc, setShowCalc] = useState(false);     // 품목 계산 이력 펼치기 상태
  const [showStrategy, setShowStrategy] = useState(false); // AI 전략 펼치기 상태
  // const { bookmark, setBookmark } = useBookmarkStore();
  console.log("북마크 데이터Detail", bookmark);
  // const hasHistory = Boolean(bookmark.calculation);
  // const hasStrategy = Boolean(bookmark.chatGPTAnswer);

  return (
    <div className="mt-4 space-y-2 text-sm">
      <p>📦 <strong>품목명:</strong> {bookmark.productName}</p>
      <p>🔢 <strong>HS코드:</strong> {bookmark.hsCode}</p>
      <p>🌍 <strong>선택 국가:</strong> {bookmark.country} {bookmark.countryFlag}</p>
      <p>📈 <strong>관세율:</strong> {bookmark.tariff}</p>

      {bookmark.calculation && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <label className="font-semibold">➕ <strong>품목 계산 이력 있음:</strong> ✔️</label> &nbsp;
            <button
              onClick={() => setShowCalc(prev => !prev)}
              className="text-blue-600 underline text-sm"
            >
              {showCalc ? '접기' : '펼치기'}
            </button>
          </div>

          {showCalc && (
            <ul className="pl-5 list-disc text-gray-700">
              {/* <li>✅ <strong>수입 원가 계산 (FTA 적용 기준)</strong></li>
              <li>&ensp;&ensp;&ensp;&ensp;물품 가격: {bookmark.calcDetails.productPrice.toLocaleString()}원</li>
              <li>&ensp;&ensp;&ensp;&ensp;CIF 기준 가격: {bookmark.calcDetails.cifPrice.toLocaleString()}원</li>
              <li>&ensp;&ensp;&ensp;&ensp;관세 (FTA 적용): {bookmark.calcDetails.ftaDuty.toLocaleString()}원</li>
              <li>&ensp;&ensp;&ensp;&ensp;부가세 (VAT): {bookmark.calcDetails.vat.toLocaleString()}원</li>
              <li>&ensp;&ensp;&ensp;&ensp;총 세금: {bookmark.calcDetails.totalTax.toLocaleString()}원</li>
              <li>✅ <strong>총 수입 비용:</strong> 약 {bookmark.calcDetails.totalCost.toLocaleString()}원</li>
              <li>&ensp;&ensp;&ensp;&ensp;1대당 총 수입단가: 약 {bookmark.calcDetails.unitCost.toLocaleString()}원</li>
              <li>✅<strong> 차이점:</strong> {bookmark.calcDetails.diff}</li> */}
              {bookmark.calculation}
            </ul>
          )}
        </>
      )}

      {bookmark.chatGPTAnswer && (
        <>
          <div className="flex items-center gap-2 mt-2">
            <label className="font-semibold">🧠 AI 추천 전략 있음: ✔️</label> &nbsp;
            <button
              onClick={() => setShowStrategy(prev => !prev)}
              className="text-blue-600 underline text-sm"
            >
              {showStrategy ? '접기' : '펼치기'}
            </button>
          </div>

          {showStrategy && (
            <ul className="pl-5 list-disc text-gray-700">
              <li><strong>추천 국가:</strong> {bookmark.strategy.recommendCountry}</li>
              <li><strong>평균 운송비:</strong> 약 {bookmark.strategy.avgShippingCost.toLocaleString()}원</li>
              <li><strong>예상 납기일:</strong> {bookmark.strategy.delivery}</li>
              <li><strong>추천 이유:</strong> {bookmark.strategy.reason}</li>
            </ul>
          )}
        </>
      )}

      <p className="mt-2">🕓 <strong>등록일:</strong> {bookmark.date}</p>
    </div>
  );
};

export default BookmarkDetail;
