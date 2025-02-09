import React, { useState } from 'react';
import { ingredientsInputs } from '@/api/ingredients/inputvalues';
import FormPageTemplate from '@/components/templates/formPage';
import IngredientProps from '@/api/ingredients/props';

const CreateIngredientForm = () => {
  const {
    ingredient,
    loading,
    isModalOpen,
    createdIngredientId,
    handleChange,
    handleImageUploaded,
    handleImageGenerated,
    handleSubmit,
    setIsModalOpen,
  } = IngredientProps({ mode: 'create' });
  

  return (
    <FormPageTemplate
        category='Ingrédients'
        title='Ajouter un ingrédient'
        description="Remplissez les détails de l'ingrédient"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        modalText="L'ingrédient a été créé avec succès !"
        itemIsCreated={createdIngredientId !== null}
        modalLink={`/ingredients/${createdIngredientId}`}
        entry={ingredient}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleImageUploaded={handleImageUploaded}
        handleImageGenerated={handleImageGenerated}
        inputs={ingredientsInputs(ingredient)} // Utilisez la fonction pour générer les inputs
        loading={loading}
        mainButtonText="Ajouter l'ingrédient"
        prompt={ingredient.name}
        formType='ingredient'
        subType='create'
        AIButtonLabel="Générer une image avec le nom de l'ingrédient"
    />
  );
};

export default CreateIngredientForm;