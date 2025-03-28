import React, { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import PageIndication from '@/components/commons/misc/pageindication';
import IngredientsList from '../ingredients/ingredientslist';
import RecettesListComponent from '../recettes/recetteslist';
import MenusListComponent from '../menus/menuList';

interface IndexPageTemplateProps {
  category: 'Menus' | 'Ingrédients' | 'Recettes';
}

const IndexPageTemplate: React.FC<IndexPageTemplateProps> = function ({ category }) {
  const router = useRouter();

  const navigateToCreate = () => {
    const normalizedCategory = category.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    router.push(`/${normalizedCategory.toLowerCase()}/create`);
  };

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
      <h2 className="text-xl mb-4 font-bold text-gray-900">{category === 'Menus' ? 'Vos menus' : category}</h2>
      {category === 'Ingrédients' && (
        <>
          <IngredientsList type='display'/>
        </>
        )}
      {category === 'Recettes' && (
        <>
        <h3 className="text-xl mb-4 font-semibold text-gray-800">Vos recettes</h3>
        <RecettesListComponent type='display' displayType='users'/>
        <h3 className="text-xl mb-4 font-semibold text-gray-800">Toutes les recettes</h3>
        <RecettesListComponent type='display'/>

        </>
        
      )}
      {category === 'Menus' && (
     
        <MenusListComponent/>
        )}
    </div>
  );
}

export default IndexPageTemplate;