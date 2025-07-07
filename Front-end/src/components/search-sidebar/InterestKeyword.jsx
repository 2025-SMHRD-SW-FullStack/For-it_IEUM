import { useDrop } from 'react-dnd';
import { toast } from 'react-toastify';
import Keyword from './Keyword';
import { keywordDeleteItem } from '../../services/keywordService';
import deleteIcon from '../../assets/image/delete.png';
import './InterestKeyword.css'

const InterestKeyword = ({ interest, setInterest, Item, userKeyword, setUserKeyword }) => {


  const keywords = userKeyword || [];

  const [, dropRef] = useDrop({
    accept: Item.KEYWORD,
    drop: (item) => {
      if (interest.includes(item.keyword)) return;

      if (keywords.length >= 5) {
        toast.warn('관심 키워드는 최대 5개까지만 등록할 수 있어요.');
        return;
      }
      setInterest([...interest, item.keyword]);
    },
  });

  const keywordDelete = async (id) => {

    try {
      const response = await keywordDeleteItem(id);

      setUserKeyword(response.userKeyword);
    } catch (error) {
    }


  }


  return (
    <div ref={dropRef} className="interestZone">

      <b className="keywordLabel">관심 있는 키워드</b>
      <br />
      {keywords.length === 0 ? <p className="placeholder">여기로 드래그하세요</p> :

        keywords.map((keyword, i) => (
          <div className='interestKeyword'>
            <Keyword
              key={i}
              keywordId={keyword.id}
              keyword={keyword.productName}
              hsCode={keyword.hsCode}
              checkType={keyword.checkType}
              onClick={() => setInterest(interest.filter((k) => k !== keyword))}
              draggable={false}
            />
            <img
              src={deleteIcon}
              alt="삭제"
              onClick={e => { e.stopPropagation; keywordDelete(keyword.id) }}
              className='deleteIcon'/>
          </div>

        ))}

    </div>
  );
};

export default InterestKeyword;