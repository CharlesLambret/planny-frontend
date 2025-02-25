import React, { useState, useEffect, ChangeEvent } from 'react';
import List from '../commons/list/List';
import { fetchRecettes, Recette } from '@/api/recettes/apicalls';
import { useRouter } from 'next/router';

interface RecettesListProps {
  onRecettesChange?: (selectedRecettes: Recette[]) => void;
  type: 'display' | 'form';
  selectedTypes?: string[];
}

const RecettesListComponent: React.FC<RecettesListProps> = ({ onRecettesChange, type, selectedTypes }) => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [selectedRecettes, setSelectedRecettes] = useState<Recette[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  let elements: 'list' | 'galery';
  if (type === 'display') {
    elements = 'galery';
  } else {
    elements = 'list';
  }
  useEffect(() => {
    const getRecettes = async () => {
      const data = await fetchRecettes();
      setRecettes(data);
    };

    getRecettes();
  }, []);

  useEffect(() => {
    if (onRecettesChange) {
      onRecettesChange(selectedRecettes);
    }
  }, [selectedRecettes, onRecettesChange]);

  useEffect(() => {
    if (selectedTypes && selectedTypes.length > 0) {
      const filteredRecettes = recettes.filter((recette) =>
        selectedTypes.includes(recette.type)
      );
      setRecettes(filteredRecettes);
    } else {
      const getRecettes = async () => {
        const data = await fetchRecettes();
        setRecettes(data);
      };

      getRecettes();
    }
  }, [selectedTypes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLSelectElement) {
      const options = e.target.options;
      const selected: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }
      setSelectedFilters(selected);
    }
  };

  const uniqueTypes = Array.from(new Set(recettes.flatMap(recette => recette.filters).join(',').split(',')));

  const filtersInput = {
    label: 'Filtres',
    name: 'filters',
    type: 'select',
    value: selectedFilters,
    options: uniqueTypes,
  };

  const router = useRouter();
  let handleEntryClick: (id: string) => void;
  let listType: 'form' | 'display' | 'etape' | 'recette';
  if (type === 'form') {
    handleEntryClick = (id: string) => {
      const recette = recettes.find((recette) => recette._id === id);
      if (recette && !selectedRecettes.some((recette) => recette._id === id)) {
        setSelectedRecettes((prevSelected) => [
          ...prevSelected,
          { ...recette },
        ]);
      }
    };
    listType = 'recette';
  } else {
    handleEntryClick = (id: string) => {
      router.push(`/recettes/${id}`);
    };
    listType = 'display';
  }

  const handleRemoveClick = (id: string) => {
    setSelectedRecettes((prevSelected) => prevSelected.filter((recette) => recette._id !== id));
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

  const filteredRecettes = selectedTypes && selectedTypes.length > 0
    ? recettes.filter((recette) => selectedTypes.includes(recette.type))
    : recettes;

  return (
    <div className="p-4 w-full mx-auto rounded-lg">
      {selectedRecettes.length > 0 && (
        <>
          <h3 className="text-md mb-4 font-semibold text-gray-800">Recettes Sélectionnées</h3>
          <div className="space-y-2 mb-4">
            <List
              entries={selectedRecettes.map((recette) => ({
                id: recette._id!,
                name: recette.name,
                image_path: recette.image_path,
                content1: recette.resume,
                content2: recette.price ? `${recette.price} €` : '',
              }))}
              listLabel="Recettes Sélectionnées"
              handleEntryClick={handleEntryClick}
              handleTrashClick={handleRemoveClick}
              moveListItem={moveListItem}
              type="recetteactive"
              itemsPerPage={5}
              elements="list"
              searchBarLabel=''
              searchTerm=''
            />
          </div>
        </>
      )}

      <List
        // Props Liste
        listLabel="Liste des Recettes"
        entries={filteredRecettes.map((recette) => ({
          id: recette._id!,
          name: recette.name,
          image_path: recette.image_path,
          content1: recette.resume,
          content2: recette.price ? `${recette.price} €` : '',
          filters: recette.filters,
        }))}
        itemsPerPage={10}
        elements={elements}

        // Barre de recherche
        searchBarLabel="Rechercher une recette..."
        searchTerm={searchTerm}
        selectedFilters={selectedFilters}
        filtersInput={filtersInput}
        handleSearchChange={handleSearchChange}
        handleFilterChange={handleFilterChange}

        // Items de la liste
        handleEntryClick={handleEntryClick}
        type="display"
      />
    </div>
  );
};

export default RecettesListComponent;