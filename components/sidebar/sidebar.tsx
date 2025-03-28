import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/components/svg/logo';
import { useAuth } from '@/context/authContext';
import { Logout } from '@/api/auth/apicalls';

interface Link {
  name: string;
  url: string;
  sublinks?: {
    name: string;
    url: string;
  }[];
  auth: boolean;
  hideafterLogin: boolean;
  onClick?: () => void;
}

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const links: Link[] = [
    {
      name: 'Accueil',
      url: '/',
      auth: false,
      hideafterLogin: false,
    },
    {
      name: 'Vos menus',
      url: '/menus',
      auth: true,
      hideafterLogin: false,
    },
    {
      name: 'Recettes',
      url: '/recettes',
      auth: false,
      hideafterLogin: false,
    },
    {
      name: 'Ingrédients',
      url: '/ingredients',
      auth: false,
      hideafterLogin: false,
    },
    {
      name: 'Connexion',
      url: '/auth/login',
      auth: false,
      hideafterLogin: true,
    },
    {
      name: 'Inscription',
      url: '/auth/register',
      auth: false,
      hideafterLogin: true,
    },
    {
      name: 'Déconnexion',
      url: '/',
      onClick: () => { logout(); },
      auth: true,
      hideafterLogin: false,
    }
  ];

  useEffect(() => {
    const authRequiredLinks = links.filter(link => link.auth).map(link => link.url);
    if (!user && authRequiredLinks.includes(router.pathname)) {
      router.push('/');
    }
  }, [user, router.pathname]);

  const filteredLinks = links.filter(link => {
    if (user) {
      return !link.hideafterLogin;
    } else {
      return !link.auth;
    }
  });

  return (
    <div className="w-1/6 border-r flex-col justify-center shadow-lg shadow-orange-300/30 items-center sticky top-0 h-screen p-7">
      <Logo className='w-1/2 mx-auto m-4'/>
      <h2 className="text-xl font-bold text-center text-orange-500 mb-6">Planny</h2>
      <ul className="space-y-2">
        {filteredLinks.map((link) => (
          <li key={link.name} className="text-center p-1 hover:bg-white-500/50 rounded">
            {link.onClick ? (
              <button onClick={link.onClick} className="text-orange-400/75 hover:text-orange-400/100 text-gray-700 p-1 rounded hover:drop-shadow-sm hover:drop-shadow-orange-100/50">
                {link.name}
              </button>
            ) : (
              <Link href={link.url} className="text-orange-400/75 hover:text-orange-400/100 text-gray-700 p-1 rounded hover:drop-shadow-sm hover:drop-shadow-orange-100/50">
                {link.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;