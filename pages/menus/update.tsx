import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import FormPageTemplate from '@/components/templates/formPage';

const UpdateMenuPage = () => {
   const router = useRouter();
    const [menuId, setMenuid] = useState<string | undefined>(undefined);
    const [routerLoading, setRouterLoading] = useState(true);
  
    useEffect(() => {
        if (router.isReady) {
          const { id } = router.query;
          if (id) {
            setMenuid(String(id));
            console.log('Router query id:', id);
          }
          setRouterLoading(false); // Set loading to false once the router is ready
        }
      }, [router.isReady, router.query]);
    
  return (
    <FormPageTemplate 
        mode='update' 
        category='Menus'
        title='Modifier un menu'
        description='Modifiez les informations du menu'
        itemId={menuId}
    />
  );
};

export default UpdateMenuPage;