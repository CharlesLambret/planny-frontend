import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchRecetteById } from '@/api/recettes/apicalls';
import {Recette} from '@/api/recettes/apicalls';
import { FilterType } from '@/api/recettes/apicalls';
import IconVegetarien from '@/components/svg/vegetarien';
import IconFour from '@/components/svg/four';
import IconVegan from '@/components/svg/vegan';
import IconSansGluten from '@/components/svg/sansgluten';
import IconSansLactose from '@/components/svg/sanslactose';
import IconPoele from '@/components/svg/poele';
import IconVapeur from '@/components/svg/vapeur';
import IconMicroOndes from '@/components/svg/microonde';
import { ClockIcon } from '@heroicons/react/24/outline';
import { IconItem } from '@/components/recettes/IconItem';
import IconPlat from '@/components/svg/plat';
import IconEntree from '@/components/svg/entree';
import IconDessert from '@/components/svg/dessert';
import IconBoisson from '@/components/svg/boisson';
import IconAperitif from '@/components/svg/aperitif';
import IconGouter from '@/components/svg/gouter';
import IconMuffin from '@/components/svg/muffin';
import { JSX } from 'react';
import RecipeType from '@/components/recettes/type';
import MainButton from '@/components/commons/misc/mainbutton';

const className= 'w-1/4'
  const color = 'black-500'
  
export const typeMapping: { [key: string]: JSX.Element } = {
  'plat': <IconPlat className={className} color={color} />,
  'entrée': <IconEntree className={className} color={color} />,
  'dessert': <IconDessert className={className} color={color} />,
  'boisson': <IconBoisson className={className} color={color} />,
  'aperitif': <IconAperitif className={className} color={color} />,
  'goûter': <IconGouter className={className} color={color} />,
  'autre': <IconMuffin className={className} color={color} />,
}

const RecetteDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [recette, setRecette] = useState<Recette>();
  const [loading, setLoading] = useState(true);

  

  const filterMapping = {
    [FilterType.VEGETARIEN]: { icon: <IconVegetarien className={className} color={color} />, text: 'Végétarien' },
    [FilterType.FOUR]: { icon: <IconFour className={className} color={color} />, text: 'Four' },
    [FilterType.VEGAN]: { icon: <IconVegan className={className} color={color} />, text: 'Vegan' },
    [FilterType.SANS_GLUTEN]: { icon: <IconSansGluten className={className} color={color} />, text: 'Sans Gluten' },
    [FilterType.SANS_LACTOSE]: { icon: <IconSansLactose className={className} color={color} />, text: 'Sans Lactose' },
    [FilterType.POELE]: { icon: <IconPoele className={className} color={color} />, text: 'Poêle' },
    [FilterType.VAPEUR]: { icon: <IconVapeur className={className} color={color} />, text: 'Vapeur' },
    [FilterType.MICRO_ONDES]: { icon: <IconMicroOndes className={className} color={color} />, text: 'Micro-ondes' }
  };

  useEffect(() => {
    if (id) {
      console.log('Fetching recette with id:', id);
      fetchRecetteById(String(id))
        .then((data) => {
          console.log('Recette data:', data);
          setRecette({
            ...data,
            filters: typeof data.filters === 'string' ? data.filters.split(',') : data.filters,
            
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching recette:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!recette) {
    return <div>Recette not found</div>;
  }

  const handleEditClick = () => {
    router.push(`/recettes/update?id=${recette._id}`);
  };

  const handleFilterSelection = (filter: FilterType) => {
    console.log('Filter selected:', filter);
  };

console.log('URL image :', `${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${recette.image_path}`)

  return (

<div className="flex mx-auto flex-col ">
        <div className="w-full flex justify-end">
          <MainButton
            onClick={handleEditClick}
            className="m-3"
            loading={false}
            mainButtonText="Modifier la recette"
          />
        </div>
        <div
          className="relative w-full mx-auto flex flex-col p-4 justify-end text-white h-2/3 rounded-lg font-bold bg-cover bg-center"
          style={
                  {
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${recette.image_path})`
                  }}
        >
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>

          <h1 className="relative py-5 text-3xl font-bold ">{recette.name}</h1>
          <p className="relative py-5 text-md ">{recette.resume}</p>
          <p className="relative py-5 text-md ">{recette.price} €</p>
        </div>
        <div className="flex flex-row flex-wrap w-full justify-start space-between">
          <IconItem 
              icon={<ClockIcon className="w-1/4" color="black-500" />}
              text={`${recette.preparation_time} min`}
              type= 'read'
            />
          <RecipeType 
              type={recette.type}
            />
        </div>
        <hr className="my-4 w-full border-gray-300" />
        <div className="flex flex-row flex-wrap w-full justify-start space-between">
        {Array.isArray(recette.filters) && recette.filters.map((filter) => {
          const { icon, text } = filterMapping[filter] || {};
          return (
            <IconItem 
              key={filter}
              filter={filter}
              icon={icon}
              text={text}
              type= 'read'
            />
          );
        })}
      </div>
      <hr className="my-4 w-full border-gray-300" />
      <div className="flex flex-col p-3">
        <h2 className="text-2xl font-bold">Ingrédients</h2>
        <ul className="list-disc list-inside">
        <div className="flex  p-2 flew-row flex-wrap w-full justify-start space-between">
                {recette.quantitesIngredients.map((ingredient) => (
                <li key={ingredient._id} className="flex items-center w-1/2 p-4 space-x-4">
                  <img className="w-1/6 rounded-xl" src={`${process.env.NEXT_PUBLIC_BASE_API_URL}/uploads/${ingredient.image_path}`} alt={ingredient.name} />
                  <p className='text-sm'>{ingredient.name} - {ingredient.quantity} {ingredient.mesure}</p>
                </li>
                ))}
              </div>
        </ul>
      </div>
      <div className="flex flex-col p-3">
        <h2 className="text-2xl font-bold">Etapes</h2>
                {recette.etapes.map((etape) => (
                <div key={etape.order} className="flex flex-row items-center justify-start w-full p-4 space-x-4">
                    <div className="w-1/6 p-5 bg-gray-300 text-xl font-bold flex items-center justify-center aspect-square">
                    {etape.order}
                  </div>
                  <div className="w-5/6">
                    <h3 className="text-lg font-bold">{etape.name}</h3>
                    <p>{etape.content}</p>
                  </div>
                </div>
                ))}
      </div>
    </div>
       
  );
};

export default RecetteDetail;