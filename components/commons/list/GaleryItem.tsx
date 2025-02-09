import React from 'react';
import MainButton from '../misc/mainbutton';
import { ListItemProps } from './props/ListGaleryProps';

 const GaleryItem: React.FC<ListItemProps> = ({ entry, handleEntryClick}) => {
  return (
    <div className="w-2/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
      <a href="#">
        <img className="rounded-t-lg w-full h-48 object-cover" src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${entry.image_path}`} alt={entry.name} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{entry.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{entry.content1}</p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{entry.content2}</p>
        <MainButton
        loading={false}
        mainButtonText=" Voir la recette"
        type='button'
        className="w-1/2 mx-auto "
        onClick={() => handleEntryClick(entry.id)}
        />
      </div>
    </div>
  );
};

export default GaleryItem;