import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchIngredientById, updateIngredientById, deleteIngredientById } from '../../api/ingredients/apicalls';
import Form from '../../components/commons/form/Form';
import Modal from '../../components/commons/modal/Modal';
import { ingredientsInputs } from '@/api/ingredients/inputvalues';
import FormPageTemplate from '@/components/templates/formPage';
import IngredientProps from '@/api/ingredients/props';

const UpdateIngredientForm = () => {
  const router = useRouter();
  const [ingredientId, setIngredientid] = useState<number | undefined>(undefined);
  const [routerLoading, setRouterLoading] = useState(true);

  useEffect(() => {
      if (router.isReady) {
        const { id } = router.query;
        if (id) {
          setIngredientid(Number(id));
          console.log('Router query id:', id);
        }
        setRouterLoading(false); // Set loading to false once the router is ready
      }
    }, [router.isReady, router.query]);
  
  const {
    ingredient,
    loading,
    isModalOpen,
    handleChange,
    handleImageUploaded,
    handleImageGenerated,
    handleSubmit,
    handleDelete,
    setIsModalOpen,
  } = IngredientProps({ mode: 'update', ingredientId });


  return (
      <FormPageTemplate
        category='Ingrédients'
        title={`Modifier l'ingrédient ${ingredient.name}`}
        description="Modifiez les détails de l'ingrédient"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalText="L\'ingrédient a été mis à jour avec succès !"
        modalLink={`/ingredients/${ingredientId}`}
        itemIsCreated={ingredientId !== null}
        entry={ingredient}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageUploaded={handleImageUploaded}
        handleImageGenerated={handleImageGenerated}
        handleDelete={handleDelete}
        inputs={ingredientsInputs(ingredient)} // Utilisez la fonction pour générer les inputs
        loading={loading}
        mainButtonText="Mettre à jour l'ingrédient"
        deleteButtonText="Supprimer l'ingrédient"
        prompt={ingredient.name}
        formType='ingredient'
        subType='update'
        AIButtonLabel=''
      />
     
  );
};

export default UpdateIngredientForm;