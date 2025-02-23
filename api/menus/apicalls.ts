import axios from 'axios';
import { Recette } from '../recettes/apicalls';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export interface Menu {
  start_date: Date;
  end_date: Date;
  recettes: Recette[];
  _id?: String;

}


export const fetchMenus = async () => {
  const response = await axios.get(`${API_URL}/menus`);
  console.log('requête effectuée sur l\'url :' + `${API_URL}/menus`);
  return response.data;
};

export const fetchMenuById = async (id: string) => {
  let menuResponse = await axios.get(`${API_URL}/menus/${id}`);
  return menuResponse.data;
};

export const addMenu = async (menu: Menu) => {
  const response = await axios.post(`${API_URL}/menus`, menu);
  return response.data;
};

export const updateMenuById = async (id: string, menu: Menu) => {
  const response = await axios.put(`${API_URL}/menus/${id}`, menu);
  return response.data;
};

export const deleteMenuById = async (id: string) => {
  const response = await axios.delete(`${API_URL}/menus/${id}`);
  return response.data;
};

