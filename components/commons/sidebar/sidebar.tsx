import React from 'react';
import Link from 'next/link';
import Logo from '@/components/svg/logo';

interface Link {
  name: string;
  url: string;
  sublinks?: {
    name: string;
    url: string;
  }[];
}

const Sidebar: React.FC = () => {
  const links: Link[] = [
    {
      name: 'Accueil',
      url: '/',
    },
    {
      name: 'Menus',
      url: '/menus',
    },
    {
      name: 'Recettes',
      url: '/recettes',
    },
    {
      name: 'Ingrédients',
      url: '/ingredients',
      sublinks: [
        
      ],
    },
  ];

  return (
    <>
    <div className="w-1/6 border-r flex-col justify-center shadow-lg shadow-orange-300/30  items-center  sticky top-0 h-screen p-7">
      <Logo className='w-1/2 mx-auto m-4'/>
      <h2 className="text-xl font-bold text-center text-orange-500  mb-6">Planny</h2>
      <ul className="space-y-2 ">
        {links.map((link) => (
          <li key={link.name} className="text-center  p-1 hover:bg-white-500/50 rounded ">
            <Link href={link.url} className=" text-orange-400/75 hover:text-orange-400/100 text-gray-700 p-1 rounded hover:drop-shadow-sm hover:drop-shadow-orange-100/50 ">
              {link.name}
            </Link>
            {link.sublinks && (
              <ul className="ml-4 mt-2 space-y-1">
                {link.sublinks.map((sublink) => (
                  <li key={sublink.name} className="text-center p-1 hover:bg-white-500/50 rounded ">
                    <Link href={sublink.url}className="text-sm hover:shadow-sm hover:shadow-orange-100/50 hover:text-orange text-gray-700 p-1 rounded" >
                      {sublink.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default Sidebar;