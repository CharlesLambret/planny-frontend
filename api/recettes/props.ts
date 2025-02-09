import { useState, useEffect } from 'react';
import { fetchRecetteById, addRecette, updateRecetteById, FilterType, Recette } from '@/api/recettes/apicalls';
import { Etape } from '@/api/recettes/apicalls';
import { Ingredient } from '../ingredients/apicalls';

interface UseRecettePropsProps {
  mode: 'create' | 'update';
  recetteId?: number;
}

const RecetteProps = ({ mode, recetteId }: UseRecettePropsProps) => {
  const [recette, setRecette] = useState<Recette>({
    preparation_time: 0,
    type: '',
    resume: '',
    name: '',
    filters: [],
    image_path: '',
    quantitesIngredients: [],
    etapes: []
  });
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [etapes, setEtapes] = useState<Etape[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdRecetteId, setCreatedRecetteId] = useState<number | null>(null);

  useEffect(() => {
    if (mode === 'update' && recetteId) {
      const fetchData = async () => {
        try {
          console.log('Fetching recette with id:', recetteId);
          const fetchedRecette = await fetchRecetteById(recetteId);
          console.log('Fetched recette data:', fetchedRecette);
          setRecette(fetchedRecette);
          setSelectedIngredients(fetchedRecette.quantitesIngredients);
          setEtapes(fetchedRecette.etapes);
          setSelectedFilters(Array.isArray(fetchedRecette.filters) ? fetchedRecette.filters : []);
        } catch (error) {
          console.error('Error fetching recette:', error);
        }
      };
      fetchData();
    } else if (mode === 'update' && !recetteId) {
      console.error('Missing id for updating recette');
    }
  }, [mode, recetteId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecette((prevRecette) => ({
      ...prevRecette,
      [name]: value,
    }));
  };

  const handleImageUploaded = (fileName: string, image_path: string) => {
    console.log('Image uploaded:', { fileName, image_path });
    setRecette((prevRecette) => ({
      ...prevRecette,
      image_path: image_path,
    }));
  };

  const handleImageGenerated = ({ fileName, fullimage_path }: { fileName: string; fullimage_path: string }) => {
    console.log('Image generated:', { fileName, fullimage_path });
    setRecette((prevRecette) => ({
      ...prevRecette,
      image_path: fileName,
    }));
  };

  const handleIngredientsChange = (selectedIngredients: Ingredient[]) => {
    setSelectedIngredients(selectedIngredients);
    setRecette((prevRecette) => ({
      ...prevRecette,
      quantitesIngredients: selectedIngredients,
    }));
  };

  const handleEtapesChange = (etapes: Etape[]) => {
    setEtapes(etapes);
  };

  const handleFilterClick = (filter: FilterType) => {
    setRecette((prevRecette) => ({
      ...prevRecette,
      filters: [...prevRecette.filters, filter],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recetteData: Recette = {
        preparation_time: recette.preparation_time,
        type: recette.type,
        resume: recette.resume,
        name: recette.name,
        filters: selectedFilters,
        image_path: recette.image_path || '',
        quantitesIngredients: selectedIngredients,
        etapes: etapes,
      };

      if (mode === 'create') {
        const response = await addRecette(recetteData);
        setCreatedRecetteId(response.id);
      } else if (mode === 'update' && recetteId) {
        await updateRecetteById(recetteId, recetteData);
        setCreatedRecetteId(recetteId);
      }

      setIsModalOpen(true);
    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} recette:`, error);
    } finally {
      setLoading(false);
    }
  };

  return {
    recette,
    selectedIngredients,
    etapes,
    selectedFilters,
    loading,
    isModalOpen,
    createdRecetteId,
    handleChange,
    handleImageUploaded,
    handleImageGenerated,
    handleIngredientsChange,
    handleEtapesChange,
    handleFilterClick,
    handleSubmit,
    setIsModalOpen,
    setSelectedFilters,
    setLoading
  };
};

export default RecetteProps;