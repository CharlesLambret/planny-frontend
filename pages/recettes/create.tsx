import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { recettesInputs } from '@/api/recettes/inputvalues';
import FormPageTemplate from '@/components/templates/formPage';
import RecetteProps from '@/api/recettes/props';
import RecetteForm from '@/components/recipe/recetteForm';

const CreateRecettePage = () => {
  

  return (
    <FormPageTemplate
      title="Créer une recette"
      category='Recettes'
      description="Créer une nouvelle recette"
      mode='create'
    />
  );
};

export default CreateRecettePage;