import React, { useEffect, useState } from 'react';
import MenuForm from '@/components/menus/form';
import FormPageTemplate from '@/components/templates/formPage';

const CreateMenuPage = () => {
  
  return (
    <FormPageTemplate
      category='Menus'
      title='Créer un menu'
      description='Créer un nouveau menu'
      mode='create'
    />
  );
};

export default CreateMenuPage;