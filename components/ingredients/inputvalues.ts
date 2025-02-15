import { InputComponentProps } from "@/components/commons/form/inputs/props";  

  export const ingredientsInputs = (ingredient: any): InputComponentProps[] => [
    {
      inputLabel: 'Nom de l\'ingrédient',
      inputName: 'name',
      inputType: 'text',
      inputValue: ingredient.name,
    },
    {
      inputLabel: 'Prix',
      inputName: 'average_price',
      inputType: 'text',
      inputValue: ingredient.average_price,
    },
    {
      inputLabel: 'Quantité vendue',
      inputName: 'quantite_vendue',
      inputType: 'text',
      inputValue: ingredient.quantite_vendue,
    },
    {
      inputLabel: 'Mesure (ex: kg, L, pièce)',
      inputName: 'mesure',
      inputType: 'select',
      inputValue: ingredient.mesure,
      inputOptions: ['kg', 'L', 'pièce', 'g', 'ml'],
    },
    {
      inputLabel: 'Type d\'ingrédient',
      inputName: 'type',
      inputType: 'select',
      inputValue: ingredient.type,
      inputOptions: ['Fruit', 'Légume', 'Viande', 'Poisson', 'Produit laitier', 'Épice', 'Herbe', 'Féculent', 'Boisson', 'Confiserie'],
    }
  ];