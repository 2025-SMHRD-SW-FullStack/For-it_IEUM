import { useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
import Keyword from './Keyword';

const InterestKeyword = ({ interest, setInterest, Item }) => {
  const [, dropRef] = useDrop({
    accept: Item.KEYWORD,
    drop: (item) => {
      if (interest.includes(item.keyword)) return;

      if (interest.length >= 5) {
        toast.warn('관심 키워드는 최대 5개까지만 등록할 수 있어요.');
        return;
      }

      setInterest([...interest, item.keyword]);
    },
  });

  return (
    <div ref={dropRef} className="interestZone">
      <b className="keywordLabel">관심 있는 키워드</b>
      <br />
      {interest.length === 0 && <p className="placeholder">여기로 드래그하세요</p>}
      {interest.map((keyword, i) => (
        <Keyword
          key={i}
          keyword={keyword}
          onClick={() => setInterest(interest.filter((k) => k !== keyword))}
          draggable={false}
        />
      ))}
    </div>
  );
};

export default InterestKeyword;