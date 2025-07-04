import { useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
import Keyword from './Keyword';

const InterestKeyword = ({ interest, setInterest, Item ,userKeyword}) => {
  const keywords = userKeyword || [];
  
  const [, dropRef] = useDrop({
    accept: Item.KEYWORD,
    drop: (item) => {
      if (interest.includes(item.keyword)) return;
      console.log(`드래그 확인 ${userKeyword[0].productName}`);
      
      if (keywords.length >= 5) {
        toast.warn('관심 키워드는 최대 5개까지만 등록할 수 있어요.');
        return;
      }

      setInterest([...interest, item.keyword]);
    },
  });

  


  return (
    <div ref={dropRef} className="interestZone">
      
      <b className="keywordLabel">관심 있는 키워드</b>
      <br/>
      {keywords.length === 0 && <p className="placeholder">여기로 드래그하세요</p>}
      
      {keywords.map((keyword, i) => (
        <Keyword
          key={i}
          keywordId={keyword.id}
          keyword={keyword.productName}
          hsCode ={keyword.hsCode}
          checkType={keyword.checkType}
          onClick={() => setInterest(interest.filter((k) => k !== keyword))}
          draggable={false}
        />
      ))}
      
    </div>
  );
};

export default InterestKeyword;