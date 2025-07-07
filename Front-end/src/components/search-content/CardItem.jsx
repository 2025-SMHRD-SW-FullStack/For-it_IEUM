import React, { use, useEffect, useState } from 'react'
import useCardStore from '../../stores/CardStore'
import star from '../../assets/image/star.png'
import filledStar from '../../assets/image/filledStarO.png' // 채워진 별 아이콘 추가
import './CardItem.css'
import { saveBookMarks, getBookMarkList, deleteBookMark } from '../../services/bookMarkService';
import { useBookmarkStore } from '../../stores/BookMarkStore';

const CardItem = ({ card }) => {
  const { selectedCard, setSelectedCard } = useCardStore();
  const {bookmarkList, setBookmark} = useBookmarkStore();

  const isSelected = (selectedCard && selectedCard.hs_code) === card.hs_code;

  const [isFavorite, setIsFavorite] = useState(false); // 즐겨찾기 상태

  const handleCardClick = () => {
    setSelectedCard(card);
  }

  const toggleFavorite = async (e) => {
    e.stopPropagation(); // 부모 div 클릭 방지
    setIsFavorite((prev) => !prev);
    if (!isFavorite) {
      const saveBookMark = await saveBookMarks(
        card.hs_code,
        card.product_name,
        card.base_tariff,
        card.top10_data[0].name,
        card.top10_data[0].rate,
        "",
        "",
        "",
        ""
      );
    }else{
      const delBookMark = await deleteBookMark("",card.hs_code);
      setBookmark(await getBookMarkList()); // 북마크 목록 새로고침
    }
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getBookMarkList();
        const isFav = favorites.some(fav => fav.hsCode === card.hs_code);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('즐겨찾기 가져오기 실패:', error);
      }
    }
    fetchFavorites();
  }, [card.hs_code, bookmarkList]);

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      key={card.id}
      onClick={handleCardClick}
    >
      <div className='cardText'>
        <div id="HS">HS코드: {card.hs_code}</div>
        <div id="Name" title={card.product_name}>
          품목명: {card.product_name.length > 7 ? card.product_name.slice(0, 7) + "..." : card.product_name}
        </div>
      </div>
      <img
        src={isFavorite ? filledStar : star}
        alt='별 아이콘'
        className='favorite'
        onClick={toggleFavorite}
      />
    </div>
  )
}

export default CardItem
