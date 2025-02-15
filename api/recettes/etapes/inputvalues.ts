import { InputFields } from "@/components/commons/form/inputs/input";
  
  export const etapesInputs = (etape: any): InputFields[] => [
    {
      label: 'Titre de l\'étape',
      name: 'name',
      type: 'text',
      value: etape.name,
    },
    {
      label: 'Contenu de l\'étape',
      name: 'content',
      type: 'text-area',
      value: etape.content,
    }
  ];