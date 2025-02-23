import { InputComponentProps } from "@/components/commons/form/inputs/props";  

  export const loginInputs = (user: any): InputComponentProps[] => [
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