import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchRecettes } from '@/api/recettes/apicalls';
import {Recette} from '@/api/recettes/apicalls';
import ListComponent from '@/components/commons/list/List';
import PageIndication from '@/components/commons/misc/pageindication';
import { List } from '@material-tailwind/react';
import IndexPageTemplate from '@/components/templates';
import { typeMapping } from './[id]';
import { ClockIcon } from '@heroicons/react/24/outline';

const RecettesList: React.FC = () => {
  const [recettes, setRecettes] = useState<Recette[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedTypes] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getRecettes = async () => {
      try {
        const data = await fetchRecettes();
        setRecettes(data);
      } catch (error) {
        console.error('Error fetching recettes:', error);
      } finally {
        setLoading(false);
      }
    };

    getRecettes();
  }, []);

  const handleRecetteClick = (id: number) => {
    router.push(`/recettes/${id}`);
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
  
  const uniqueTypes = Array.from(new Set(recettes.flatMap(recette => recette.filters).join(',').split(',')));

  const filtersInput = {
    label: 'Filtres',
    name: 'filters',
    type: 'select',
    value: selectedFilters,
    options: uniqueTypes,
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
      <IndexPageTemplate
        entries={recettes.filter(recette => recette.id !== undefined).map(recette => ({
          id: recette.id!,
          name: recette.name,
          image_path: recette.image_path,
          content1: `${typeMapping[recette.type] || ''} | ${recette.resume}`,
          content2: `${recette.preparation_time} min`,
          filters: recette.filters
        }))}
        listLabel='Rechercher une recette'
        searchBarLabel="Tarte à la myrtille..."
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filtersInput={filtersInput}
        selectedFilters={selectedFilters}
        handleFilterChange={handleTypeChange}
        handleEntryClick={handleRecetteClick}
        elementsDisplay='galery'
        itemsPerPage={10}
        filterLabel='Type de recette'
        category="Recettes"
      />
  );
};

export default RecettesList;
