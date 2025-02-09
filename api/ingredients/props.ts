import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchIngredientById, addIngredient, updateIngredientById, deleteIngredientById } from '@/api/ingredients/apicalls';
interface ingredientProps {
  mode: 'create' | 'update';
  ingredientId?: number;
}
const IngredientProps = ({ mode, ingredientId }: ingredientProps) => {
    const [ingredient, setIngredient] = useState({
        name: '',
        quantite_vendue: '',
        average_price: '',
        mesure: '',
        type: '',
        image_path: '',
      });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createdIngredientId, setCreatedIngredientId] = useState<number | null>(null);
    
    useEffect(() => {
        if (mode === 'update' && ingredientId) {
          const fetchIngredient = async () => {
            console.log('Fetching ingredient with id:', ingredientId);
            try {
              const data = await fetchIngredientById(Number(ingredientId));
              if (Array.isArray(data) && data.length > 0) {
                const ingredientData = data[0];
                setIngredient({
                  name: ingredientData.name,
                  quantite_vendue: ingredientData.quantite_vendue,
                  average_price: ingredientData.average_price,
                  mesure: ingredientData.mesure,
                  type: ingredientData.type,
                  image_path: ingredientData.image_path,
                });
              } else {
                console.error('No ingredient found with the given id');
              }
            } catch (error) {
              console.error('Error fetching ingredient:', error);
            } finally {
              setLoading(false);
            }
          };
          fetchIngredient();
        }
    }, [mode, ingredientId]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setIngredient((prevIngredient) => ({
          ...prevIngredient,
          [name]: value,
        }));
    };
    
    const handleImageUploaded = (fileName: string, image_path: string) => {
        console.log('Image uploaded:', { fileName, image_path });
        setIngredient((prevIngredient) => ({
          ...prevIngredient,
          image_path: image_path,
        }));
    };
    
    const handleDelete = async () => {
        setLoading(true);
        try {
          await deleteIngredientById(Number(ingredientId));
          console.log('Ingredient deleted');
          router.push('/ingredients'); // Redirect to the ingredients list page
        } catch (error) {
          console.error('Error deleting ingredient:', error);
        } finally {
          setLoading(false);
        }
      };

    const handleImageGenerated = ({ fileName, fullimage_path }: { fileName: string; fullimage_path: string }) => {
        console.log('Image generated:', { fileName, fullimage_path });
        setIngredient((prevIngredient) => ({
          ...prevIngredient,
          image_path: fileName,
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newIngredient = {
                name: ingredient.name,
                average_price: parseFloat(ingredient.average_price),
                quantite_vendue: parseInt(ingredient.quantite_vendue, 10),
                mesure: ingredient.mesure,
                type: ingredient.type,
                image_path: ingredient.image_path,
            };
    
            if (mode === 'create') {
                const response = await addIngredient(newIngredient);
                console.log('Ingredient created:', response);
                setCreatedIngredientId(response.id);
                setIsModalOpen(true);
            } else if (mode === 'update' && ingredientId) {
                const response = await updateIngredientById(Number(ingredientId), newIngredient);
            
                console.log('Ingredient updated:', response);
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} ingredient:`, error);
        } finally {
            setLoading(false);
        }
    };
    
    return {
        ingredient,
        loading,
        isModalOpen,
        createdIngredientId,
        handleChange,
        handleImageUploaded,
        handleImageGenerated,
        handleSubmit,
        setIsModalOpen,
        handleDelete
    };
};

export default IngredientProps;