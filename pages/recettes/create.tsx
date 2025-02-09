import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { recettesInputs } from '@/api/recettes/inputvalues';
import FormPageTemplate from '@/components/templates/formPage';
import RecetteProps from '@/api/recettes/props';

const CreateRecettePage = () => {


  const {
    recette,
    selectedFilters,
    isModalOpen,
    createdRecetteId,
    handleChange,
    handleImageUploaded,
    handleImageGenerated,
    handleIngredientsChange,
    handleEtapesChange,
    handleFilterClick,
    setIsModalOpen,
    setSelectedFilters,
    loading,
    handleSubmit
  } = RecetteProps({ mode: 'create' });

  useEffect(() => {
    console.log('Recette:', recette);
    console.log('Selected Filters:', selectedFilters);
  }, [recette, selectedFilters]);


  return (
    <FormPageTemplate

      // FormPageProps

      category='Recettes'
      title={`Créer une nouvelle recette`}
      description='Remplissez les informations de la recette'
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalText='La recette a été créée avec succès !'
      itemIsCreated={createdRecetteId ? true : false}
      modalLink={`/recettes/${createdRecetteId}`}
      
      // FormProps

      loading={loading}
      mainButtonText="Créer la recette"
      formType='recette'
      subType='create'
      entry={recette}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      inputs={recettesInputs(recette)}

      // Cas Recette 
      
      onIngredientsChange={handleIngredientsChange}
      onEtapesChange={handleEtapesChange}
      handleFilterClick={handleFilterClick}
      recetteFilters={selectedFilters}
      setSelectedrecetteFilters={setSelectedFilters}

      // PhotoInputProps

      handleImageUploaded={handleImageUploaded}

      // AIButtonProps

      handleImageGenerated={handleImageGenerated}
      AIButtonLabel='Générer une image avec le nom de la recette'
      prompt={recette.name}

    />
  );
};

export default CreateRecettePage;