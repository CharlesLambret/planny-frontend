import React from 'react';
import InputComponent from '../form/inputs/input';

export interface SearchBarProps {
    searchBarLabel: string;
    searchTerm: string;
    handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterLabel?: string;
    filtersInput?: {
        label: string;
        name: string;
        type: string;
        value: string[];
        options?: string[];
      };
    selectedFilters?: string[];
    handleFilterChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
    searchBarLabel,
    searchTerm,
    handleSearchChange,
    filterLabel,
    filtersInput,
    selectedFilters,
    handleFilterChange,
}) => {
    return (
        <div className="flex w-full justify-between items-center mb-4">
            <div className="w-2/3 m-2">
                
                <InputComponent
                    inputName="searchbar"
                    inputType="text"
                    inputLabel={searchBarLabel ? searchBarLabel : ''}
                    inputPlaceholder={searchBarLabel}
                    inputValue={searchTerm}
                    handleChange={handleSearchChange ? (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleSearchChange(e as React.ChangeEvent<HTMLInputElement>) : () => {}}
                    inputClassName="w-full p-2 border rounded"
                />
            </div>
            <div className="flex w-1/3 m-2 flex-wrap">
                <InputComponent
                    inputLabel={filterLabel || ''}
                    inputName={filtersInput?.name || ''}
                    inputType="select"
                    inputValue={selectedFilters || []}
                    inputOptions={filtersInput?.options || []}
                    handleChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleFilterChange ? handleFilterChange(e as React.ChangeEvent<HTMLInputElement>) : () => {}}
                    divClassName="w-full"
                />
            </div>
        </div>
    );
};

export default SearchBar;