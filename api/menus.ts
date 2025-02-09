import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL ;

export const fetchMenus = async () => {
  const response = await axios.get(`${API_URL}/menus`);
  return response.data;
};

export const fetchMenuById = async (id: number) => {
  const response = await axios.get(`${API_URL}/menus/${id}`);
  return response.data;
};

export const addMenu = async (menu: {
  start_date: string;
  end_date: string;
  selected_meals: string;
}) => {
  const response = await axios.post(`${API_URL}/menus`, menu);
  return response.data;
};

export const updateMenuById = async (id: number, menu: {
  start_date: string;
  end_date: string;
  selected_meals: string;
}) => {
  const response = await axios.put(`${API_URL}/menus/${id}`, menu);
  return response.data;
};

export const deleteMenuById = async (id: number) => {
  const response = await axios.delete(`${API_URL}/menus/${id}`);
  return response.data;
};

export const getMostRecentMenu = async () => {
  const response = await axios.get(`${API_URL}/most-recent-menu`);
  return response.data;
}