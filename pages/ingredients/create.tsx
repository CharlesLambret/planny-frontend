import IngredientForm from '@/components/ingredients/form';
import FormPageTemplate from '@/components/templates/formPage';
import React, { useState } from 'react';

const CreateIngredientForm = () => {
 
  return (
    <FormPageTemplate 
      mode='create'
      title="Créer un ingrédient"
      category='Ingrédients'
      description="Créer un nouvel ingrédient"
    />
  );
};

export default CreateIngredientForm;