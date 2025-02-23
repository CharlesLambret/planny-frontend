import React, { useState, ReactElement } from 'react';
import { FilterType } from "@/api/recettes/apicalls"; // Import FilterType as an enum
import IconDessert from "@/components/svg/dessert";
import IconFour from "@/components/svg/four";
import IconPlat from "@/components/svg/plat";
import IconVegan from "@/components/svg/vegan";
import IconVegetarien from "@/components/svg/vegetarien";
import IconVapeur from "@/components/svg/vapeur";
import IconMicroOndes from "@/components/svg/microonde";
import IconSansGluten from "@/components/svg/sansgluten";
import IconSansLactose from "@/components/svg/sanslactose";
import IconPoele from "@/components/svg/poele";
import { IconItem } from './IconItem';

const filtersclassNames = 'w-1/4'; // Define the classnames for the filters
const filtersColor = 'gray-400';
const filterMapping: Record<FilterType, { icon: ReactElement<typeof IconVegetarien>; text: string }> = {
  [FilterType.VEGETARIEN]: { icon: <IconVegetarien className='w-1/4' color='black-500' />, text: 'Végétarien' },
  [FilterType.FOUR]: { icon: <IconFour className='w-1/4' color='black-500' />, text: 'Four' },
  [FilterType.VEGAN]: { icon: <IconVegan className='w-1/4' color='black-500' />, text: 'Vegan' },
  [FilterType.SANS_GLUTEN]: { icon: <IconSansGluten className='w-1/4' color='black-500' />, text: 'Sans Gluten' },
  [FilterType.SANS_LACTOSE]: { icon: <IconSansLactose className='w-1/4' color='black-500' />, text: 'Sans Lactose' },
  [FilterType.POELE]: { icon: <IconPoele className='w-1/4' color='black-500' />, text: 'Poêle' },
  [FilterType.VAPEUR]: { icon: <IconVapeur className='w-1/4' color='black-500' />, text: 'Vapeur' },
  [FilterType.MICRO_ONDES]: { icon: <IconMicroOndes className='w-1/4' color='black-500' />, text: 'Micro-ondes' }
};
interface RecipeFiltersProps {
  handleFilterClick?: (filter: FilterType) => void;
  selectedFilters: FilterType[];
  setSelectedFilters?: React.Dispatch<React.SetStateAction<FilterType[]>>;
}

export default function RecipeFilters({ handleFilterClick, selectedFilters, setSelectedFilters }: RecipeFiltersProps) {
    const [availableFilters, setAvailableFilters] = useState<FilterType[]>([
        FilterType.VEGETARIEN,
        FilterType.FOUR,
        FilterType.VEGAN,
        FilterType.SANS_GLUTEN,
        FilterType.SANS_LACTOSE,
        FilterType.POELE,
        FilterType.VAPEUR,
        FilterType.MICRO_ONDES
      ]);

      const handleFilterSelection = (filter: FilterType) => {
        if (!selectedFilters.includes(filter)) {
          setSelectedFilters && setSelectedFilters([...selectedFilters, filter]);
          setAvailableFilters(availableFilters.filter(f => f !== filter));
          handleFilterClick && handleFilterClick(filter);
        }
      };

      const handleRemoveClick = (filter: FilterType) => {
        setSelectedFilters && setSelectedFilters(selectedFilters.filter(f => f !== filter));
        setAvailableFilters([...availableFilters, filter]);
      };
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row flex-wrap w-full justify-center space-between mb-4">
        {selectedFilters?.map((filter) => {
          const { icon } = filterMapping[filter];
          return (
            <div key={filter} onClick={() => handleRemoveClick(filter)} className={`flex m-3  justify-center items-center text-orange-500 hover:cursor-pointer hover:text-orange-600 w-1/6`}>
              {icon}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row flex-wrap w-full justify-center space-between">
        {availableFilters.map((filter) => {
            const { icon, text } = filterMapping[filter];
            return (
                <IconItem 
                  type='form'
                  key={filter} 
                  icon={icon} 
                  text={text} 
                  filter={filter} 
                  handleFilterSelection={handleFilterSelection} 
                />
            );
            })}
      </div>
    </div>
  );
}