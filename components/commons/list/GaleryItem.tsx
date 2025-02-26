import React from 'react';
import MainButton from '../misc/mainbutton';
import { ListItemProps } from './props/ListGaleryProps';
import { HeartIcon } from '@heroicons/react/24/outline';

 const GaleryItem: React.FC<ListItemProps> = ({ entry, handleEntryClick, buttonText}) => {
  if (!entry) return null;
  return (
    <div className="w-2/5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 cursor-pointer">
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
        mainButtonText={buttonText || 'Voir'}
        type='button'
        className=" mx-auto "
        onClick={() => handleEntryClick && handleEntryClick(entry.id)}
        />
        <HeartIcon className="w-6 h-6 text-red-500 cursor-pointer hover:fill-red-600 hover:shadow-sm hover:shadow-red-200 mt-2" />
      </div>
    </div>
  );
};

export default GaleryItem;