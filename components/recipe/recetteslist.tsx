import React, { useState, useEffect } from 'react';
import List from '../commons/list/List';
import { fetchRecettes, Recette } from '@/api/recettes/apicalls';

interface RecettesListProps {
  onRecettesChange: (selectedRecettes: Recette[]) => void;
}

const RecettesList: React.FC<RecettesListProps> = ({ onRecettesChange }) => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [selectedRecettes, setSelectedRecettes] = useState<Recette[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const getRecettes = async () => {
      const data = await fetchRecettes();
      setRecettes(data);
    };

    getRecettes();
  }, []);

  useEffect(() => {

    onRecettesChange(selectedRecettes);
  }, [selectedRecettes, onRecettesChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, checked } = e.target as HTMLInputElement;
    setSelectedFilters((prevFilters) =>
      checked ? [...prevFilters, value] : prevFilters.filter((filter) => filter !== value)
    );
  };

  const handleEntryClick = (id: number) => {
    const recette = recettes.find((recette) => recette.id === id);
    if (recette && !selectedRecettes.some((recette) => recette.id === id)) {
      setSelectedRecettes((prevSelected) => [
        ...prevSelected,
        { ...recette },
      ]);
    }
  };

  const handleRemoveClick = (id: number) => {
    setSelectedRecettes((prevSelected) => prevSelected.filter((recette) => recette.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedRecettes((prevSelected) =>
      prevSelected.map((recette) =>
        recette.id === id ? { ...recette, quantity } : recette
      )
    );
  };

  const moveListItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = selectedRecettes[dragIndex];
    if (dragItem) {
      const updatedItems = [...selectedRecettes];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, dragItem);
      setSelectedRecettes(updatedItems);
    }
  };

  const filtersInput = {
    label: 'Type d\'ingrédient',
    name: 'filters',
    type: 'select',
    value: selectedFilters,
    options: Array.from(new Set(recettes.map((ing) => ing.type))),
  };

  return (
    <div className="p-4 w-full mx-auto rounded-lg">
      {selectedRecettes.length > 0 && (
        <>
          <h3 className="text-md mb-4 font-semibold text-gray-800">Ingrédients Sélectionnés</h3>
          <div className="space-y-2 mb-4">
            <List
              entries={selectedRecettes.map((recette, index) => ({
                id: recette.id!,
                name: recette.name,
                image_path: recette.image_path,
                content1: recette.resume,
                content2: recette.filters.join(', '),
              }))}
              listLabel="Ingrédients Sélectionnés"
              filtersInput={filtersInput}
              selectedFilters={selectedFilters}
              handleEntryClick={handleEntryClick}
              handleTrashClick={handleRemoveClick}
              moveListItem={moveListItem}
              handleQuantityChange={handleQuantityChange}
              type="form"
              itemsPerPage={5}
              elements="list"

            />
          </div>
        </>
      )}
      
      <List
        entries={recettes.map((recette, index) => ({
          id: recette.id!,
          name: recette.name,
          image_path: recette.image_path,
          content1: recette.resume,
          content2: recette.filters.join(', '),
        }))}
        searchBarLabel="Rechercher une recette..."
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        listLabel="Liste des Recettes"
        filtersInput={filtersInput}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        handleEntryClick={handleEntryClick}
        type="display"
        itemsPerPage={10}
        elements="list"
      />
    </div>
  );
};

export default RecettesList;