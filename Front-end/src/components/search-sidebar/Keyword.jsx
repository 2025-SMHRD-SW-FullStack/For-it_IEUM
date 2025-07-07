import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { keywordSaveItem } from '../../services/keyWordService';
import { searchItem } from '../../services/searchService';
import { useNavigate } from 'react-router-dom';
import './Keyword.css'

const Keyword = ({
  keyword,
  hsCode,
  checkType,
  onClick,
  keywordId,
  draggable = false,
  Item = { KEYWORD: 'keyword' }, // fallback 기본값
  isSelected = false,
  setUserKeyword,
  children,
}) => {

  const navigate = useNavigate();

  const [{ isDragging }, dragRef] = useDrag({
    type: Item.KEYWORD,
    item: { keyword, hsCode, checkType },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (item, monitor) => {
      // 실제로 드롭이 이뤄진 경우에만 실행
      if (item && monitor.didDrop()) {
        try {
          const response = await keywordSaveItem({
            productName: item.keyword,
            hsCode: item.hsCode,
            checkType: item.checkType
          });
          setUserKeyword(response.userKeyword)
        } catch (err) {
        }
      }
    },
  });

  const handleClick = (e) => {
    if (!isDragging && onClick) {
      onClick(e);
      const choice = checkType
      const query = hsCode
      navigate(`/search?category=${choice}&query=${query}`);
    }
  };

  return (
    <div 
      ref={draggable ? dragRef : null}
      className={`keyword ${draggable ? '' : 'interest'} ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: draggable ? 'move' : 'pointer',
      }}
      value={`${hsCode}`}
      keywordId={`${keywordId}`}
    >
      {keyword}
      {children}
    </div>
  );
};

export default Keyword;
