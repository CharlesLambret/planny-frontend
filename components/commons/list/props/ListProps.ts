import {  Entry , ListItemProps} from "./ListGaleryProps";

export default interface ListProps  extends ListItemProps {
  entries: Entry[];
  searchBarLabel?: string;
  searchTerm?: string;
  searchBarPlaceholder?: string;

  listLabel?: string;
  filtersInput?: {
    label: string;
    name: string;
    type: string;
    value: string[];
    options?: string[];
  };
  selectedFilters?: string[];
  itemsPerPage: number;
  elements : 'list' | 'galery';
  filterLabel?: string | '';
  handleSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

} 