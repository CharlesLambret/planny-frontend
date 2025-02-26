import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMenuById } from '@/api/menus/apicalls';
import {Menu} from '@/api/menus/apicalls';
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
import TemplateDetail from '@/components/templates/elementPage';
import GaleryItem from '@/components/commons/list/GaleryItem';

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

const MenuDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [menu, setMenu] = useState<Menu>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      console.log('Fetching menu with id:', id);
      fetchMenuById(String(id))
        .then((data) => {
          console.log('Menu data:', data);
          setMenu({
            ...data,
            filters: typeof data.filters === 'string' ? data.filters.split(',') : data.filters,
            
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching menu:', error);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!menu) {
    return <div>Menu not found</div>;
  }

  const handleEditClick = () => {
    router.push(`/menus/update?id=${menu._id}`);
  };

const section1 = (
  <>
    {menu.types_repas.map((type) => (
        <RecipeType 
        type={type}
        onClick={() => {}}
        isSelected={false}
      />
    ))
    }
  </>
);


const section3 = (
  <>
    {menu.recettes.map((recette) => (
                <GaleryItem
                    key={recette._id}
                    entry={{
                        id: recette._id || '',
                        name: recette.name,
                        image_path: recette.image_path,
                        content1: `${recette.preparation_time} min`,
                        content2: ''
                    }}
                    type='display' // Add the missing 'type' property
                    handleEntryClick={() => router.push(`/recettes/${recette._id}`)}
                />
                ))}
  </>
);
const formattedStartDate = new Date(menu.start_date).toLocaleDateString();
const formattedEndDate = new Date(menu.end_date).toLocaleDateString();
  return (
      <TemplateDetail
        entry={{
          name: `Menu du ${formattedStartDate} au ${formattedEndDate}`,
          divcontent1:`Pour ${menu.nb_personnes} personnes`,
          divcontent2: `${menu.price} €`,
          image_path: menu.image_path,
          section1: section1,
          section3: section3,
          section3Title: 'Recettes',
       
        }}
        handleEditClick={handleEditClick}
        category='menu'
      />
  );
};

export default MenuDetail;