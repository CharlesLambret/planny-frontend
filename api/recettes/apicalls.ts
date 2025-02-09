import axios from 'axios';
import { Ingredient } from '../ingredients/apicalls';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const recetteTypes = ['Petit-déjeuner', 'Entrée', 'Repas', 'Dessert', 'Goûter', 'Apéritif', 'Boisson', 'Autre'];
export enum FilterType {
  VEGETARIEN = 'vegetarien',
  FOUR = 'four',
  VEGAN = 'vegan',
  SANS_GLUTEN = 'sans_gluten',
  SANS_LACTOSE = 'sans_lactose',
  POELE = 'poele',
  VAPEUR = 'vapeur',
  MICRO_ONDES = 'micro_ondes'
}

export interface Recette {
  preparation_time: number;
  type: typeof recetteTypes[number];
  resume: string;
  name: string;
  filters: FilterType[];
  image_path: string;
  etapes: Etape[];
  price?: number;
  id?: number;
  quantitesIngredients: Ingredient[];

}

export interface Etape {
  'nom-section': string, 
  contenu: string, 
  ordre : number
  id? : number,
}

export const fetchRecettes = async () => {
  const response = await axios.get(`${API_URL}/recettes`);
  console.log('requête effectuée sur l\'url :' + `${API_URL}/recettes`);
  return response.data;
};

export const fetchRecetteById = async (id: number) => {
  let recetteResponse = await axios.get(`${API_URL}/recettes/${id}`);
  return recetteResponse.data;
};

export const addRecette = async (recette: Recette) => {
  const response = await axios.post(`${API_URL}/recettes`, recette);
  return response.data;
};

export const updateRecetteById = async (id: number, recette: Recette) => {
  const response = await axios.put(`${API_URL}/recettes/${id}`, recette);
  return response.data;
};

export const deleteRecetteById = async (id: number) => {
  const response = await axios.delete(`${API_URL}/recettes/${id}`);
  return response.data;
};


export const fetchFilteredRecettes = async (filters: {
  ingredientId?: number;
  excludeIngredient?: boolean;
  type?: string;
  excludeType?: boolean;
  preparationTime?: number;
  excludePreparationTime?: boolean;
  filters?: FilterType[];
  recent?: boolean;
}): Promise<Recette[]> => {
  const response = await axios.get<Recette[]>(`${API_URL}/filtered-recettes`, {
    params: filters,
  });
  return response.data;
};


