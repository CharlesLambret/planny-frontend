import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { recettesInputs } from '@/api/recettes/inputvalues';
import FormPageTemplate from '@/components/templates/formPage';
import RecetteProps from '@/api/recettes/props';

const UpdateRecetteForm = () => {
  const router = useRouter();
  const [recetteId, setRecetteId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      if (id) {
        setRecetteId(Number(id));
        console.log('Router query id:', id);
      }
      setLoading(false); // Set loading to false once the router is ready
    }
  }, [router.isReady, router.query]);

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
    handleSubmit
  } = RecetteProps({ mode: 'update', recetteId });

  useEffect(() => {
    console.log('Recette:', recette);
    console.log('Selected Filters:', selectedFilters);
  }, [recette, selectedFilters]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while loading
  }

  return (
    <FormPageTemplate
      category='Recettes'
      title={`Modifier la recette ${recette.name}`}
      description='Modifiez les informations de la recette'
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalText='La recette a été modifiée avec succès !'
      itemIsCreated={createdRecetteId ? true : false}
      modalLink={`/recettes/${createdRecetteId}`}
      loading={loading}
      mainButtonText="Confirmer les modifications"
      prompt={recette.name}
      formType='recette'
      subType='update'
      AIButtonLabel='Générer une image avec le nom de le recette'
      entry={recette}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleImageUploaded={handleImageUploaded}
      handleImageGenerated={handleImageGenerated}
      inputs={recettesInputs(recette)}
      onIngredientsChange={handleIngredientsChange}
      onEtapesChange={handleEtapesChange}
      handleFilterClick={handleFilterClick}
      recetteFilters={selectedFilters}
      setSelectedrecetteFilters={setSelectedFilters}
    />
  );
};

export default UpdateRecetteForm;