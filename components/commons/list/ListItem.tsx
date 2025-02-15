import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { TrashIcon, EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import InputComponent from '../form/inputs/input';
import { ListItemProps } from './props/ListGaleryProps';

const ListItem: React.FC<ListItemProps> = ({
  entry,
  handleEntryClick,
  type,
  handleTrashClick,
  handleEllipsisHold,
  moveListItem,
  handleQuantityChange,
  index,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: 'listItem',
    hover(item: { index: number }, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (hoverIndex !== undefined && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (hoverIndex !== undefined && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (hoverIndex !== undefined) {
        moveListItem && moveListItem(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'listItem',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const quantity = parseInt(e.target.value, 10);
    if (handleQuantityChange) {
      if (entry?.id !== undefined) {
        handleQuantityChange(entry.id, quantity);
      }
    }
  };

  return (
    <div
      ref={ref}
      className="flex mx-auto justify-between hover:px-3 hover:shadow-sm hover:background-gray-200 items-center p-2 border-b cursor-pointer w-3/4"
      onClick={() => entry && handleEntryClick && handleEntryClick(entry.id)}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          {type !== 'etape' && (
            <img
              src={entry ? `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${entry.image_path}` : ''}
              alt={entry ? entry.name : ''}
              className="w-1/6 mx-2 aspect-square object-cover rounded-full"
            />
          )}
          <div className="flex flex-col mx-4">
            <span className="text-gray-700">{entry ? entry.name : ''}</span>
            <div className="flex flex-row items-center">
              <span className="text-gray-700 text-sm">{entry ? entry.content1 : ''}</span>
            </div>
            <span className="text-gray-700 text-sm">{entry ? entry.content2 : ''}</span>
          </div>
          {type === 'form' && (
            <InputComponent
              inputName="quantity"
              inputLabel="Quantité"
              inputType="number"
              inputValue={entry ? entry.quantity?.toString() || '1' : '1'}
              handleChange={handleQuantityInputChange}
              divClassName="w-1/3 mx-4"
              inputClassName="w-full"
            />
          )}
        </div>
        {type === 'form' && (
          <div className="flex flex-row justify-end items-center">
            {handleEllipsisHold && (
              <EllipsisHorizontalCircleIcon
                className="w-6 h-6 text-gray-500 hover:text-gray-600 cursor-pointer"
                onMouseDown={() => entry && entry.id !== undefined && handleEllipsisHold(entry.id)}
              />
            )}
            {handleTrashClick && (
              <TrashIcon
                className="w-6 h-6 text-red-500 cursor-pointer hover:text-red-600"
                onClick={() => entry && entry.id !== undefined && handleTrashClick(entry.id)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListItem;