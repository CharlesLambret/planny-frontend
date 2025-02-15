import React from 'react';
import DatePicker from '../commons/form/inputs/datepicker';
import RecettesList from '@/components/recipe/recetteslist';
import { Menu } from '@/api/menus/apicalls';
import BaseForm from '../commons/form/baseForm';
import { Recette } from '@/api/recettes/apicalls';
import { useState } from 'react';
import { addMenu, updateMenuById } from '@/api/menus';
import RecettesListComponent from '@/components/recipe/recetteslist';

export interface MenuFormProps {
  menuId?: number;
  mode: 'create' | 'update';
}

const MenuForm:  React.FC<MenuFormProps> = ({ mode, menuId }) => {
const [menu, setMenu] = React.useState<Menu>({ start_date: new Date(), end_date: new Date(), recettes: [] });
const [selectedRecettes, setSelectedRecettes] = React.useState<Recette[]>([]);
const [createdMenuId, setCreatedMenuId] = React.useState<number | null>(null);
const [loading, setLoading] = useState(false);

const handleRecettesChange = (recettes: Recette[]) => {
  setSelectedRecettes(recettes);
  setMenu(prev => ({ ...prev, recettes }));
}

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setMenu(prev => ({ ...prev, [name]: value }));
}

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  try {
    const menuData = {
      ...menu,
      start_date: menu.start_date.toISOString(),
      end_date: menu.end_date.toISOString(),
      recettes: selectedRecettes
    };

    const response = mode === 'create' 
      ? await addMenu(menuData)
      : await updateMenuById(menuId!, menuData);
      
    setCreatedMenuId(mode === 'create' ? response.id : menuId);
  } catch (error) {
    console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} menu:`, error);
  } finally {
    setLoading(false);
  }
};
const menusComponents = (
  <>
  <DatePicker 
    startDate={menu.start_date}
    endDate={menu.end_date}
    handleChange={handleChange}
   />
   <div className="w-full border-t-2 border-gray-300 my-3">
     <h2 className="text-lg font-bold my-3 text-bold">Sélectionnez des recettes à ajouter au menu</h2>
      <RecettesListComponent
        onRecettesChange={handleRecettesChange}
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
    inputs={[]} // Provide appropriate inputs here
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