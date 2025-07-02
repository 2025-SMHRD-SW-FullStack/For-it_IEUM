import { useDrag } from 'react-dnd';

const Keyword = ({
  keyword,
  onClick,
  draggable = false,
  Item = { KEYWORD: 'keyword' }, // fallback 기본값
  isSelected = false,
}) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: Item.KEYWORD,
    item: { keyword },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = (e) => {
    if (!isDragging && onClick) {
      onClick(e);
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
    >
      {keyword}
    </div>
  );
};

export default Keyword;
