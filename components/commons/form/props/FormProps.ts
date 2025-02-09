import { PhotoInputProps, AIButtonProps, InputComponentProps } from "./InputsProps";
import { Etape, FilterType } from "@/api/recettes/apicalls";
import { Ingredient } from "@/api/ingredients/apicalls";


export interface FormProps extends PhotoInputProps, AIButtonProps {
  
  // FormProps

  formType: 'ingredient' | 'recette' | 'menu' | 'user' | 'etape' ;
  subType : 'create' | 'update'
  entry: any;
  inputs: InputComponentProps[];
  loading: boolean;
  mainButtonText: string;
  deleteButtonText?: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleDelete?: () => void;
  handleAlternate?: () => void;

  // Cas Recette 

  recetteFilters?: FilterType[];
  etapes? : Etape[];
  ingredients? : Ingredient[];
  onEtapesChange?: (etapes: Etape[]) => void;
  onIngredientsChange?: (selectedIngredients: Ingredient[]) => void;
  handleFilterClick?:  (filter: FilterType) => void;
  setSelectedrecetteFilters?: React.Dispatch<React.SetStateAction<FilterType[]>>;

  // Cas Menu

  datePickerStartDate?: Date;
  datePickerEndDate?: Date;
  handleDatePickerChange? :  (e: React.ChangeEvent<HTMLInputElement>) => void;

}