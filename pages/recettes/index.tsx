import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchRecettes } from '@/api/recettes/apicalls';
import {Recette} from '@/api/recettes/apicalls';
import IndexPageTemplate from '@/components/templates';
import { typeMapping } from './[id]';

const IndexRecettes: React.FC = () => {
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

  const handleRecetteClick = (id: string) => {
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
      <IndexPageTemplate category='Recettes'
      />
  );
};

export default IndexRecettes;
