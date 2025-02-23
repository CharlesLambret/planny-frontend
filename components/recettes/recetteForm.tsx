import React from 'react';
import IngredientsList from '../ingredients/ingredientslist';
import EtapesList from './etapeslist';
import RecipeFilters from './filters';
import { addRecette, Etape, fetchRecetteById, FilterType, updateRecetteById } from '@/api/recettes/apicalls';
import { Ingredient } from '@/api/ingredients/apicalls';
import { useEffect, useState } from 'react';
import { Recette } from '@/api/recettes/apicalls';
import BaseForm from '../commons/form/baseForm';
import { recettesInputs } from '@/api/recettes/inputvalues';
import { useRouter } from 'next/router';

export interface RecetteFormProps {
  mode: 'create' | 'update';
}

const RecetteForm: React.FC<RecetteFormProps> = ({ mode }) => {
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
  const router = useRouter();
  const recetteId = router.query.id;

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [etapes, setEtapes] = useState<Etape[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdRecetteId, setCreatedRecetteId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleIngredientsChange = (ingredients: Ingredient[]) => {
    setSelectedIngredients(ingredients);
    setRecette(prev => ({ ...prev, quantitesIngredients: ingredients }));
  };

  const handleEtapesChange = (newEtapes: Etape[]) => {
    setEtapes(newEtapes);
    setRecette(prev => ({ ...prev, etapes: newEtapes }));
  };

  const handleFilterClick = (filter: FilterType) => {
    setRecette(prev => ({
      ...prev,
      filters: [...prev.filters, filter],
    }));
  };

  const recettesComponents = (
    <>
      <RecipeFilters 
        handleFilterClick={handleFilterClick} 
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
      <div className="w-full border-t-2 border-gray-300 my-3">
        <h2 className="text-lg font-bold my-3 text-bold">Sélectionnez des ingrédients à ajouter à la recette</h2>
        <IngredientsList type='form' onIngredientsChange={handleIngredientsChange} loadedIngredients={selectedIngredients}/>
        <h2 className="text-lg my-3 font-bold border-t-2 border-gray-300 my-3 pt-3">Ajoutez des étapes à la recette</h2>
        <EtapesList
          initialEtapes={etapes}
          onEtapesChange={handleEtapesChange}
        />
      </div>
    </>
  );

  useEffect(() => {
    if (mode === 'update' && recetteId) {
      const fetchData = async () => {
        try {
          const fetchedRecette = await fetchRecetteById(String(recetteId));
          console.log('Fetched recette:', fetchedRecette); // Log fetched recette
          setRecette(fetchedRecette);
          setSelectedIngredients(fetchedRecette.quantitesIngredients);
          setEtapes(fetchedRecette.etapes);
          setSelectedFilters(Array.isArray(fetchedRecette.filters) ? fetchedRecette.filters : []);
        } catch (error) {
          console.error('Error fetching recette:', error);
        }
      };
      fetchData();
    }
  }, [mode, recetteId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRecette(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUploaded = (fileName: string, image_path: string) => {
    setRecette(prev => ({ ...prev, image_path }));
  };

  const handleImageGenerated = ({ fileName, fullimage_path }: { fileName: string; fullimage_path: string }) => {
    setRecette(prev => ({ ...prev, image_path: fileName }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recetteData: Recette = {
        ...recette,
        filters: selectedFilters,
        quantitesIngredients: selectedIngredients,
        etapes
      };

      const response = mode === 'create' 
        ? await addRecette(recetteData)
        : await updateRecetteById(String(recetteId), recetteData);
        
      setCreatedRecetteId(mode === 'create' ? response.id : recetteId);
      setIsModalOpen(true);
    } catch (error) {
      console.error(`Error ${mode === 'create' ? 'creating' : 'updating'} recette:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseForm
      formType='recette'
      subType={mode}
      entry={recette}
      
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleImageUploaded={handleImageUploaded}
      handleImageGenerated={handleImageGenerated}
      loading={loading}
      itemIsCreated={!!createdRecetteId}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      modalText={mode === 'create' ? 'Recette créée avec succès!' : 'Recette mise à jour avec succès!'}
      modalLink={`/recettes/${createdRecetteId}`}
      inputs={recettesInputs(recette)}
      mainButtonText={mode === 'create' ? "Créer la recette" : "Mettre à jour la recette"}
      prompt={recette.name}
      AIButtonLabel="Générer une image"
      additionalInputs={recettesComponents}
    />
  );
};

export default RecetteForm;