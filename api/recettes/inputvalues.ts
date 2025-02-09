import { InputComponentProps } from "@/components/commons/form/props/InputsProps"; 

  export const recettesInputs = (recette: any): InputComponentProps[] => [
    {
      inputLabel: 'Nom de la recette',
      inputName: 'name',
      inputType: 'text',
      inputValue: recette.name,

    },
    {
      inputLabel: 'Temps de préparation (min)',
      inputName: 'preparation_time',
      inputType: 'text',
      inputValue: recette.preparation_time
    },
    {
      inputLabel : 'Description de la recette',
      inputName : 'resume',
      inputType : 'text-area',
      inputValue : recette.resume
    },
    {
        inputLabel: 'Type de recette',
        inputName: 'type',
        inputType: 'select',
        inputValue: recette.type,
        inputOptions : ['Petit-déjeuner','Entrée', 'Repas','Dessert','Goûter','Apéritif','Boisson','Autre']

    }
  ];

  