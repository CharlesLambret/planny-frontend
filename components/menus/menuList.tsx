import React, { useState, useEffect, ChangeEvent } from 'react';
import List from '../commons/list/List';
import { fetchUserMenus, Menu } from '@/api/menus/apicalls';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/authContext';

const MenusListComponent: React.FC = () => {
    const [menus, setMenus] = useState<Menu[]>([]);
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        const getMenus = async () => {
            if (user) {
                console.log('user._id:', user._id);
                let data = await fetchUserMenus(user._id as string);
                setMenus(data);
            }
        };

        getMenus();
    }, []);

    const handleEntryClick = (id: string) => {
        router.push(`/menus/${id}`);
    };
  

    return (
        <div className="p-4 w-full mx-auto rounded-lg">
            <List
            // Props Liste
            listLabel="Vos menus"
            entries={menus.map((menu) => ({
                id: menu._id as string,
                name: `Menu du ${new Date(menu.start_date).toLocaleDateString()} au ${new Date(menu.end_date).toLocaleDateString()}`,
                image_path: menu.image_path || '',
                content1: `Pour ${menu.nb_personnes} personnes`,
                content2: menu.price ? `${menu.price} €` : '',
            }))}
            itemsPerPage={10}
            elements='galery'

            // Barre de recherche
            searchBarLabel=""
            searchTerm=""
            selectedFilters={[]}
                        handleSearchChange={() => {}}
            handleFilterChange={() => {}}

            // Items de la liste
            handleEntryClick={handleEntryClick}
            type="display"
            />
        </div>
    );
};

export default MenusListComponent;