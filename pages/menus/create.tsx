import React, { useEffect, useState } from 'react';
import FormPageTemplate from '@/components/templates/formPage';
import { Menu } from '@/api/menus/apicalls';
import { Recette } from '@/api/recettes/apicalls';

const CreateMenuPage = () => {
  const [menu, setMenu] = useState<Menu>({
    start_date: new Date(),
    end_date: new Date(),
    image_path: '',
    recettes: [],
  });

  const [selectedRecettes, setSelectedRecettes] = useState<Recette[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdMenuId, setCreatedMenuId] = useState<number | null>(null);

  useEffect(() => {
    console.log('Selected recettes:', selectedRecettes);
    setMenu((prevMenu) => ({
      ...prevMenu,
      recettes: selectedRecettes,
    }));
  }, [selectedRecettes]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMenu((prevMenu) => ({
      ...prevMenu,
      [name]: value,
    }));
  };

  const handleImageUploaded = (fileName: string, image_path: string) => {
    console.log('Image uploaded:', { fileName, image_path });
    setMenu((prevMenu) => ({
      ...prevMenu,
      image_path: image_path,
    }));
  };

  const handleImageGenerated = ({ fileName, fullimage_path }: { fileName: string; fullimage_path: string }) => {
    console.log('Image generated:', { fileName, fullimage_path });
    setMenu((prevMenu) => ({
      ...prevMenu,
      image_path: fileName,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      try {
        const recetteData: Recette = {
          preparation_time: recette.preparation_time,
          type: recette.type,
          resume: recette.resume,
          name: recette.name,
          filters: selectedFilters,
          image_path: recette.image_path || '',
          quantitesIngredients: selectedIngredients,
          etapes: etapes,
        };
  
        if (mode === 'create') {
          const response = await addRecette(recetteData);
          setCreatedRecetteId(response.id);
        } else if (mode === 'update' && recetteId) {
          await updateRecetteById(recetteId, recetteData);
          setCreatedRecetteId(recetteId);
        }
  
        setIsModalOpen(true);
      } catch (error) {
        console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} recette:`, error);
      } finally {
        setLoading(false);
      }
    };
  
  return (
    <FormPageTemplate

      // FormPageProps

      category='Menu'
      title={`Créer un nouveau menu`}
      description='Remplissez les informations du menu'
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalText='La menu a été créé avec succès !'
      itemIsCreated={createdMenuId ? true : false}
      modalLink={`/menus/${createdMenuId}`}
      
      // FormProps

      loading={loading}
      mainButtonText="Créer la menu"
      formType='menu'
      subType='create'
      entry={menu}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      inputs={menusInputs(menu)}

      
      // PhotoInputProps

      handleImageUploaded={handleImageUploaded}

      // AIButtonProps

      handleImageGenerated={handleImageGenerated}
      AIButtonLabel='Générer une image avec le nom de la menu'
      prompt={menu.name}

    />
  );
};

export default CreateMenuPage;