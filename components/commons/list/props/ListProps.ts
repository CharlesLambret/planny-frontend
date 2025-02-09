import {  Entry , ListItemProps} from "./ListGaleryProps";

export default interface ListProps  extends ListItemProps {
  // Props Liste
  entries: Entry[];
  itemsPerPage: number;
  elements : 'list' | 'galery';
  listLabel?: string;

  // Barre de recherche
  searchBarLabel?: string;
  searchTerm?: string;
  searchBarPlaceholder?: string;
  filterLabel?: string | '';
  selectedFilters?: string[];
  filtersInput?: {
    label: string;
    name: string;
    type: string;
    value: string[];
    options?: string[];
  };
  handleFilterChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

} 