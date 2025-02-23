import { InputComponentProps } from "@/components/commons/form/inputs/props";  

  export const userInputs = (user: any): InputComponentProps[] => [
    {
      inputLabel: 'Nom',
      inputName: 'nom',
      inputType: 'text',
      inputValue: user.nom,
    },
    {
      inputLabel: 'Prénom',
      inputName: 'prenom',
      inputType: 'text',
      inputValue: user.prenom,
    },
    {
      inputLabel: 'Email',
      inputName: 'email',
      inputType: 'text',
      inputValue: user.email,
    },
    {
      inputLabel: 'Mot de passe',
      inputName: 'password',
      inputType: 'text',
      inputValue: user.password,
    },
  ];