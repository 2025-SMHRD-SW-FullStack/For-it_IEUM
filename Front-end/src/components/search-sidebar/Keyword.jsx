import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { keywordSaveItem } from '../../services/keyWordService';

const Keyword = ({
  keyword,
  hsCode,
  checkType,
  onClick,
  draggable = false,
  Item = { KEYWORD: 'keyword' }, // fallback 기본값
  isSelected = false,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: Item.KEYWORD,
    item: { keyword,hsCode,checkType },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: async (item, monitor) => {
      // 실제로 드롭이 이뤄진 경우에만 실행
      if (item && monitor.didDrop()) {
        try {
          const response = await keywordSaveItem({
            productName:item.keyword,
            hsCode:item.hsCode,
            checkType:item.checkType
          });
          console.log('백엔드 저장 결과:', response);
        } catch (err) {
          console.error('저장 실패:', err);
        }
      }
    },
  });

  const handleClick = (e) => {
    if (!isDragging && onClick) {
      onClick(e);
      console.log('클릭');
      console.log(keyword);
      console.log(hsCode);
      console.log(checkType);
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
    >
      {keyword}
    </div>
  );
};

export default Keyword;
