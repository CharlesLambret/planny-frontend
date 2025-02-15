import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMenus, Menu } from '../../api/menus/apicalls';
import IndexPageTemplate from '@/components/templates';
 

const MenusList: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  useEffect(() => {
    const getMenus = async () => {
      try {
        const data = await fetchMenus();
        setMenus(data);
      } catch (error) {
        console.error('Error fetching menus:', error);
      } finally {
        setLoading(false);
      }
    };

    getMenus();
  }, []);

  const handleMenuClick = (id: number) => {
    router.push(`/menus/${id}`);
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

  const uniqueTypes = Array.from(new Set(menus.flatMap(menu => menu.recettes.flatMap(recette => recette.filters))));
  const filtersInput = {
    label: 'Type d\'ingrédient',
    name: 'type',
    type: 'select',
    value: selectedTypes,
    options: uniqueTypes,
  };

  // Convert menus to the format expected by List
const listEntries = menus.map(menu => {
    const randomRecipe = menu.recettes[Math.floor(Math.random() * menu.recettes.length)];
    return {
        id: menu.id ?? 0, // Ensure id is a number
        name: `Menu du ${menu.start_date} au ${menu.end_date}`,
        image_path: randomRecipe.image_path,
        content1: `${menu.recettes.map(recette => recette.filters).join(', ')} `,
        content2: '',
        filters: Array.from(new Set(menu.recettes.flatMap(recette => recette.filters))),
    };
});



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
        handleEntryClick={handleMenuClick}
        itemsPerPage={10}
        elementsDisplay='list'
        category="Menus"
        filterLabel="Filtrer par type"
      />
  );
};

export default MenusList;