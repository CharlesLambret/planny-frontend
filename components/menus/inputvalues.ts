import { InputComponentProps } from "@/components/commons/form/inputs/props"; 

  export const menusInputs = (menu: any): InputComponentProps[] => [
    {
      inputLabel: 'Nombre de personnes',
      inputName: 'nb_personnes',
      inputType: 'number',
      inputValue: menu.nb_personnes,

    },
 
  ];

  