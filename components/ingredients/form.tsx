import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import BaseForm from '../commons/form/baseForm';
import { fetchIngredientById, deleteIngredientById, addIngredient, updateIngredientById } from '@/api/ingredients/apicalls';
import { ingredientsInputs } from './inputvalues';

export interface IngredientFormProps {
  mode: 'create' | 'update';
  ingredientId?: string;
}

const IngredientForm: React.FC<IngredientFormProps> = ({ mode, ingredientId }) => {
const [ingredient, setIngredient] = useState({
        name: '',
        quantite_vendue: '',
        average_price: '',
        mesure: '',
        type: '',
        image_path: '',
        id: null as number | null,
      });
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [createdIngredientId, setCreatedIngredientId] = useState<number | null>(null);
    
    useEffect(() => {
        if (mode === 'update' && ingredientId) {
          const fetchIngredient = async () => {
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
                  id: ingredientData.id,
                });
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
    setIngredient(prev => ({
      ...prev,
          [name]: value,
        }));
    };
    
    const handleImageUploaded = (fileName: string, image_path: string) => {
    setIngredient(prev => ({
      ...prev,
          image_path: image_path,
        }));
    };
    
    const handleDelete = async () => {
        setLoading(true);
        try {
          await deleteIngredientById(Number(ingredientId));
      router.push('/ingredients');
        } catch (error) {
          console.error('Error deleting ingredient:', error);
        } finally {
          setLoading(false);
        }
      };

    const handleImageGenerated = ({ fileName, fullimage_path }: { fileName: string; fullimage_path: string }) => {
    setIngredient(prev => ({
      ...prev,
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
                setCreatedIngredientId(response.id);
                setIsModalOpen(true);
            } else if (mode === 'update' && ingredientId) {
        await updateIngredientById(Number(ingredientId), newIngredient);
                setIsModalOpen(true);
                setCreatedIngredientId(Number(ingredientId)); 
            }
        } catch (error) {
            console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} ingredient:`, error);
        } finally {
            setLoading(false);
        }
    };
  return (
    <BaseForm
      formType='ingredient'
      subType={mode}
      entry={ingredient}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleImageUploaded={handleImageUploaded}
      handleImageGenerated={handleImageGenerated}
      handleDelete={handleDelete}
      loading={loading}
      inputs={ingredientsInputs(ingredient)}
      mainButtonText={mode === 'create' ? "Créer l'ingrédient" : "Mettre à jour l'ingrédient"}
      prompt={ingredient.name}
      AIButtonLabel="Générer une image"
      itemIsCreated={!!createdIngredientId}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalText={mode === 'create' ? "Ingrédient créé avec succès!" : "Ingrédient mis à jour avec succès!"}
      modalLink={`/ingredients/${createdIngredientId}`}
    />
  );
};

export default IngredientForm;