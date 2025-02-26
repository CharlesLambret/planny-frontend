import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchIngredientById, Ingredient } from '../../api/ingredients/apicalls';
import TemplateDetail from '@/components/templates/elementPage';

const IngredientDetail: React.FC = () => {
  const [ingredient, setIngredient] = useState<Ingredient>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchIngredient = async () => {
        console.log('Fetching ingredient with id:', id);
        const data = await fetchIngredientById(String(id));
        console.log('Fetched ingredient data:', data);
        setIngredient(data);
      };
      fetchIngredient();
    }
  }, [id]);

 


  const handleEditClick = () => {
    if (ingredient) {
      router.push(`/ingredients/update?id=${ingredient._id}`);
    }
  };

  return (
    <>
      {ingredient ? (
        <TemplateDetail
          entry={{
            name: ingredient.name,
            divcontent1: `${ingredient.quantite_vendue}${ingredient.mesure} pour ${ingredient.average_price}€`,
            divcontent2: `${ingredient.type}`,
            image_path: ingredient.image_path,
          }}
          handleEditClick={handleEditClick}
          category="ingredient"
        />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default IngredientDetail;