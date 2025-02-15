import React, { useState, useEffect } from 'react';
import List from '../commons/list/List';
import { fetchIngredients, Ingredient } from '@/api/ingredients/apicalls';

interface IngredientsListProps {
  onIngredientsChange: (selectedIngredients: Ingredient[]) => void;
}

const IngredientsList: React.FC<IngredientsListProps> = ({ onIngredientsChange }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const getIngredients = async () => {
      const data = await fetchIngredients();
      setIngredients(data);
    };

    getIngredients();
  }, []);

  useEffect(() => {

    onIngredientsChange(selectedIngredients);
  }, [selectedIngredients, onIngredientsChange]);

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
    const ingredient = ingredients.find((ing) => ing.id === id);
    if (ingredient && !selectedIngredients.some((ing) => ing.id === id)) {
      setSelectedIngredients((prevSelected) => [
        ...prevSelected,
        { ...ingredient, quantity: parseInt(ingredient.quantite_vendue, 10) },
      ]);
    }
  };

  const handleRemoveClick = (id: number) => {
    setSelectedIngredients((prevSelected) => prevSelected.filter((ingredient) => ingredient.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, quantity } : ingredient
      )
    );
  };

  const moveListItem = (dragIndex: number, hoverIndex: number) => {
    const dragItem = selectedIngredients[dragIndex];
    if (dragItem) {
      const updatedItems = [...selectedIngredients];
      updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, dragItem);
      setSelectedIngredients(updatedItems);
    }
  };

  const filtersInput = {
    label: 'Type d\'ingrédient',
    name: 'filters',
    type: 'select',
    value: selectedFilters,
    options: Array.from(new Set(ingredients.map((ing) => ing.type))),
  };

  return (
    <div className="p-4 w-full mx-auto rounded-lg">
      {selectedIngredients.length > 0 && (
        <>
          <h3 className="text-md mb-4 font-semibold text-gray-800">Ingrédients Sélectionnés</h3>
          <div className="space-y-2 mb-4">
            <List
              entries={selectedIngredients.map((ing, index) => ({
                id: ing.id,
                name: ing.name,
                image_path: ing.image_path,
                content1: `${ing.quantite_vendue} ${ing.mesure} pour ${ing.average_price} € `,
                content2: ``,
                order: index + 1,
                quantity: ing.quantity,
              }))}
              searchBarLabel="Rechercher un ingrédient..."
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              listLabel="Ingrédients Sélectionnés"
              filtersInput={filtersInput}
              selectedFilters={selectedFilters}
              handleFilterChange={handleFilterChange}
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
        entries={ingredients.map((ing) => ({
          id: ing.id,
          name: ing.name,
          image_path: ing.image_path,
          content1: ing.quantite_vendue,
          content2: ing.average_price,
        }))}
        searchBarLabel="Rechercher un ingrédient..."
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        listLabel="Liste des Ingrédients"
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

export default IngredientsList;