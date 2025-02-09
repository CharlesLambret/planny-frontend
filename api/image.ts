import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await axios.post(`${API_URL}/images/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  const fileName = response.data.fileName; // Assurez-vous que fileName est correctement extrait
  const fullimage_path = `${API_URL}/uploads/${fileName}`;
  return { fileName, fullimage_path };
};

export const generateImage = async (prompt: string) => {
  const response = await axios.get(`${API_URL}/images/download/${prompt}`);
  const fileName = response.data.fileName;
  const fullimage_path = `${API_URL}/uploads/${fileName}`;
  return { fileName, fullimage_path };
};

export const deleteImage = async (fileName: string) => {
  const response = await axios.delete(`${API_URL}/images/delete/${fileName}`);
  return response.data;
};

