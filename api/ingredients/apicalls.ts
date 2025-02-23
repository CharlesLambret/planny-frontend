import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export interface Ingredient {
  _id: string;
  name: string;
  quantite_vendue: string;
  average_price: string;
  mesure: string;
  image_path: string;
  type: string;
  image_link: string;
  quantity?: number;
}
export const fetchIngredients = async () => {
  const response = await axios.get(`${API_URL}/ingredients`);
  return response.data;
};

export const fetchIngredientById = async (id: string) => {
  const response = await axios.get(`${API_URL}/ingredients/${id}`);
  return response.data;
};

export const addIngredient = async (ingredient: {
  name: string;
  type: string;
  average_price: number;
  quantite_vendue: number;
  mesure: string;
  image_path: string;
}) => {
  const response = await axios.post(`${API_URL}/ingredients`, ingredient);
  return response.data;
};

export const updateIngredientById = async (id: string, ingredient: {
  name: string;
  average_price: number;
  quantite_vendue: number;
  mesure: string;
  image_path: string;
}) => {
  const response = await axios.put(`${API_URL}/ingredients/${id}`, ingredient);
  return response.data;
};

export const deleteIngredientById = async (id: string) => {
  const response = await axios.delete(`${API_URL}/ingredients/${id}`);
  return response.data;
};