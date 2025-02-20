import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import ListComponent from '@/components/commons/list/List';
import PageIndication from '@/components/commons/misc/pageindication';
import { Entry } from '../commons/list/props/ListGaleryProps';

interface IndexPageTemplateProps {
  entries: Array<{
    id: number;
    name: string;
    image_path: string;
    content1: string;
    content2: string;
    filters: string[];
  }>;
  listLabel: string;
  searchBarLabel: string;
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filtersInput: any;
  selectedFilters: string[];
  handleFilterChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  elementsDisplay: "list" | "galery";
  itemsPerPage: number;
  category: string;
  filterLabel: string;
  handleEntryClick: (id: number) => void;
}

const IndexPageTemplate: React.FC<IndexPageTemplateProps> = function ({
  entries,
  listLabel,
  searchBarLabel,
  searchTerm,
  handleSearchChange,
  filtersInput,
  selectedFilters,
  handleFilterChange,
  handleEntryClick,
  elementsDisplay,
  itemsPerPage,
  category,
  filterLabel,
}) {
  const router = useRouter();

  const navigateToCreate = () => {
    router.push(`/${category.toLowerCase()}/create`);
  };

  const listEntries: Entry[] = entries.map(entry => ({
    id: entry.id,
    name: entry.name,
    image_path: entry.image_path,
    content1: entry.content1,
    content2: entry.content2,
    filters: entry.filters,
  }));

  return (
    <div className="p-4 w-full mx-auto rounded-lg">
      <div className="flex justify-between w-full">
        <PageIndication breadcrumb={category} title="" />
        <button 
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600" 
          onClick={navigateToCreate}
        >
          {category === 'Ingrédients' ? 'Créer un ingrédient' : category=== 'Recettes' ? 'Créer une recette' : 'Créer un menu'}
        </button>
      </div>
      <h2 className="text-xl mb-4 font-bold text-gray-900">Liste des {category.toLowerCase()}</h2>
      <ListComponent
        entries={listEntries}
        listLabel={listLabel}
        searchBarLabel={searchBarLabel}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        filtersInput={filtersInput}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        handleEntryClick={handleEntryClick}
        elements={elementsDisplay}
        itemsPerPage={itemsPerPage}
        type="display"
        filterLabel={filterLabel}
      />
    </div>
  );
};

export default IndexPageTemplate;