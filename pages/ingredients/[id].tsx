import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchIngredientById, Ingredient } from '../../api/ingredients/apicalls';
import MainButton from '@/components/commons/misc/mainbutton';

const IngredientDetail: React.FC = () => {
  const [ingredient, setIngredient] = useState<Ingredient | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchIngredient = async () => {
        console.log('Fetching ingredient with id:', id);
        const data = await fetchIngredientById(Number(id));
        console.log('Fetched ingredient data:', data);
        if (Array.isArray(data) && data.length > 0) {
          setIngredient(data[0]);
        } else {
          setIngredient(null);
        }
      };
      fetchIngredient();
    }
  }, [id]);

  if (!ingredient) {
    return <div>Loading...</div>;
  }

  console.log('Rendering ingredient:', ingredient);

  const handleEditClick = () => {
    router.push(`/ingredients/update?id=${ingredient.id}`);
  };

  return (
      <div className="rounded-lg  w-full p-4">
        <div className="flex">
          <div className="w-1/2">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${ingredient.image_path}`}
              alt={ingredient.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-1/2 p-4 my-auto">
            <h2 className="text-2xl font-bold mb-2">{ingredient.name}</h2>
            <p className="text-gray-700 mb-2">
              {ingredient.quantite_vendue} {ingredient.mesure} pour {ingredient.average_price}€
            </p>
            <p className="text-gray-700 mb-2">Type de produit : {ingredient.type}</p>
            <MainButton
              onClick={handleEditClick}
              className="mt-4 "
              loading={false}
              mainButtonText="Modifier l'ingrédient"
            />
          </div>
        </div>
      </div>
  );
};

export default IngredientDetail;