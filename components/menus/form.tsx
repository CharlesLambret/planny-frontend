import React, { useState } from 'react';
import DatePicker from '../commons/form/inputs/datepicker';
import RecettesListComponent from '@/components/recettes/recetteslist';
import { Menu } from '@/api/menus/apicalls';
import BaseForm from '../commons/form/baseForm';
import { Recette } from '@/api/recettes/apicalls';
import { addMenu, updateMenuById } from '@/api/menus/apicalls';
import RecipeType from '../recettes/type';
import { useAuth } from '@/context/authContext';
import { menusInputs } from './inputvalues';

export interface MenuFormProps {
  menuId?: string;
  mode: 'create' | 'update';
}

const MenuForm: React.FC<MenuFormProps> = ({ mode, menuId }) => {
  const [menu, setMenu] = useState<Menu>({ start_date: new Date(), end_date: new Date(), recettes: [], userID: '', types_repas: [], nb_personnes: 1 });
  const [selectedRecettes, setSelectedRecettes] = useState<Recette[]>([]);
  const [createdMenuId, setCreatedMenuId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<("PETIT_DEJEUNER" | "ENTREE" | "REPAS" | "DESSERT" | "GOUTER" | "APERITIF" | "BOISSON" | "AUTRE")[]>([]);
  const {user} = useAuth();
  const handleRecettesChange = (recettes: Recette[]) => {
    setSelectedRecettes(recettes);
    setMenu(prev => ({ ...prev, recettes }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'start_date' || name === 'end_date') {
      setMenu(prev => ({ ...prev, [name]: new Date(value) }));
    } else {
      setMenu(prev => ({ ...prev, [name]: value }));
    }
  };

  const calculateDays = (startDate: Date, endDate: Date) => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  const types = [{
    name: 'PETIT_DEJEUNER',
    label: 'Petit-Déjeuner',
  }, {
    name: 'ENTREE',
    label: 'Entrée',
  }, {
    name: 'REPAS',
    label: 'Repas',
  }, {
    name: 'DESSERT',
    label: 'Dessert',
  }, {
    name: 'GOUTER',
    label: 'Goûter',
  }, {
    name: 'APERITIF',
    label: 'Apéritif',
  }, {
    name: 'BOISSON',
    label: 'Boisson',
  }, {
    name: 'AUTRE',
    label: 'Autre',
  }]
 
  const days = calculateDays(menu.start_date, menu.end_date);

  const handleTypeClick = (type: "PETIT_DEJEUNER" | "ENTREE" | "REPAS" | "DESSERT" | "GOUTER" | "APERITIF" | "BOISSON" | "AUTRE") => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const menuData = {
        ...menu,
        start_date: menu.start_date,
        end_date: menu.end_date,
        nb_personnes: menu.nb_personnes,
        recettes: selectedRecettes,
        userID: user?._id || '', 
      };
  
      const response = mode === 'create'
        ? await addMenu(menuData)
        : await updateMenuById(menuId!, { ...menuData, start_date: new Date(menuData.start_date), end_date: new Date(menuData.end_date) });
  
      setCreatedMenuId(mode === 'create' ? response.id : menuId);
    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} menu:`, error);
    } finally {
      setLoading(false);
    }
  };
  

  const menusComponents = (
    <>
      <div className="flex flex-col  w-full">
        <h3 className="text-lg font-bold my-3 text-bold">Sélectionnez les dates pour ce menu</h3>
        <div className="flex flex-row flex-wrap">
          <DatePicker 
            startDate={menu.start_date}
            endDate={menu.end_date}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="w-full border-t-2 border-gray-300 my-3"/>
      <div className="flex flex-col">
        <h3 className="text-lg font-bold my-3 text-bold">Sélectionnez les types de recettes pour chaque jour</h3>
        <div className="flex flex-row flex-wrap">
            {types.map(typeObject => (
            <RecipeType
              key={typeObject.name}
              type={typeObject.label}
              onClick={() => handleTypeClick(typeObject.name as any)}
              isSelected={selectedTypes.includes(typeObject.name as any)}
            />
            ))}
        </div>
      </div>
      <div className="w-full border-t-2 border-gray-300 my-3">
        <h2 className="text-lg font-bold my-3 text-bold">Sélectionnez des recettes à ajouter au menu</h2>
        <RecettesListComponent
          type='form'
          onRecettesChange={handleRecettesChange}
          selectedTypes={selectedTypes.length > 0 ? selectedTypes : undefined}
        />
      </div>
    </>
  );
 
  return (
    <BaseForm
      formType='menu'
      subType={mode}
      entry={menu}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      loading={loading}
      mainButtonText={mode === 'create' ? "Créer le menu" : "Mettre à jour le menu"}
      additionalInputs={menusComponents}
      inputs={menusInputs(menu)} // Provide appropriate inputs here
      handleImageUploaded={() => {}} // Provide appropriate handler here
      prompt="" // Provide appropriate prompt here
      AIButtonLabel="" // Provide appropriate label here
      handleImageGenerated={() => {}} // Provide appropriate handler here
      itemIsCreated={!!createdMenuId}
      isModalOpen={false} // Provide appropriate state here
      setIsModalOpen={() => {}} // Provide appropriate handler here
      modalText="" // Provide appropriate text here
      modalLink="" // Provide appropriate link here
    />
  );
};

export default MenuForm;