import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchIngredients, Ingredient } from '../../api/ingredients/apicalls';
import List from '../../components/commons/list/List';
import PageIndication from '@/components/commons/misc/pageindication';
import ListComponent from '../../components/commons/list/List';
import IndexPageTemplate from '@/components/templates';
 

const IngredientsList: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const data = await fetchIngredients();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      } finally {
        setLoading(false);
      }
    };

    getIngredients();
  }, []);

  const handleIngredientClick = (id: number) => {
    router.push(`/ingredients/${id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (e.target instanceof HTMLSelectElement) {
      const options = e.target.options;
      const selected: string[] = [];
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }
      setSelectedTypes(selected);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const uniqueTypes = Array.from(new Set(ingredients.map(ingredient => ingredient.type)));
  const filtersInput = {
    label: 'Type d\'ingrédient',
    name: 'type',
    type: 'select',
    value: selectedTypes,
    options: uniqueTypes,
  };

  // Convert ingredients to the format expected by List
  const listEntries = ingredients.map(ingredient => ({
    id: ingredient.id,
    name: ingredient.name,
    image_path: ingredient.image_path,
    content1: `${ingredient.quantite_vendue} ${ingredient.mesure}`,
    content2: ingredient.type,
  }));



  return (
      <IndexPageTemplate
        entries={listEntries}
        listLabel='Rechercher un ingrédient'
        searchBarLabel="Pomme..."
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filtersInput={filtersInput}
        selectedFilters={selectedTypes}
        handleFilterChange={handleTypeChange}
        handleEntryClick={handleIngredientClick}
        itemsPerPage={10}
        elementsDisplay='list'
        category="Ingredients"
        filterLabel="Filtrer par type"
      />
  );
};

export default IngredientsList;