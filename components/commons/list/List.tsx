import React from 'react';
import ListItem from './ListItem';
import InputComponent from '../form/inputs/input';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import GaleryItem from './GaleryItem';
import ListProps from './props/ListProps';


const ListComponent: React.FC<ListProps> = ({
  entries,
  searchBarLabel,
  searchTerm = '',
  handleSearchChange,
  listLabel,
  filtersInput,
  filterLabel,
  selectedFilters = [],
  handleFilterChange = () => {},
  handleEntryClick = () => {},
  handleTrashClick,
  handleEllipsisHold,
  moveListItem,
  handleQuantityChange,
  type,
  itemsPerPage,
  elements,
  searchBarPlaceholder
}) => {

  const filteredEntries = entries.filter((entry) => {
    const matchesSearchTerm = entry.name?.toLowerCase().includes(searchTerm?.toLowerCase());
    const entryFilters = typeof entry.filters === 'string' ? (entry.filters as string).split(',') : [];
    const matchesFilters = selectedFilters.length === 0 || entryFilters.some((filter: string) => selectedFilters.includes(filter)) || selectedFilters.includes(entry.content2 as string);
    return matchesSearchTerm && matchesFilters;
  });

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEntries.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full">
        {type === 'display' && (
          <div className="flex w-full justify-between items-center mb-4">
            <div className="w-2/3 m-2">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="search">
                {listLabel}
              </label>
              <InputComponent
                inputName="searchbar"
                inputType="text"
                inputLabel={searchBarLabel ? searchBarLabel : ''}
                inputPlaceholder={searchBarPlaceholder}
                inputValue={searchTerm}
                handleChange={handleSearchChange ? (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleSearchChange(e as React.ChangeEvent<HTMLInputElement>) : () => {}}
                inputClassName=" w-full p-2  border rounded"
              />
            </div>
            <div className="flex w-1/3 m-2 flex-wrap">
              <InputComponent
                inputLabel={filterLabel || ''}
                inputName={filtersInput?.name || ''}
                inputType="select"
                inputValue={selectedFilters || []}
                inputOptions={filtersInput?.options || []} // Pass all options to a single select
                handleChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleFilterChange ? handleFilterChange(e as React.ChangeEvent<HTMLInputElement>) : () => {}}
                divClassName='w-full'
              />
            </div>
            </div>
        )}
        <div className={`space-y-2 ${elements === 'galery' ? 'w-full flex flex-row flex-wrap items-start justify-between p-2' : ''}`}>
          {currentItems.map((entry, index) => (
            elements === 'list' ?
            <ListItem 
              key={entry.id} 
              entry={entry} 
              handleEntryClick={handleEntryClick} 
              type={type}
              handleTrashClick={handleTrashClick}
              handleEllipsisHold={handleEllipsisHold}
              handleQuantityChange={handleQuantityChange}
              moveListItem={moveListItem}
              index={index}
            /> : 
            <GaleryItem 
              key={entry.id} 
              entry={entry} 
              type='autre'
              handleEntryClick={handleEntryClick}
            />
          ))}
        </div>
        <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredEntries.length / itemsPerPage) }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-orange-200 hover:bg-orange-300 text-white' : 'bg-white text-orange-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    </DndProvider>
  );
};

export default ListComponent;

