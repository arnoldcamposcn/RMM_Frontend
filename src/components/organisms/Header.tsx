import React from 'react';
import Logo from '../atoms/Logo';
import Navigation from '../molecules/Navigation';
import SearchInput from '../atoms/SearchInput';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  className?: string;
  onSearch?: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ className = '', onSearch }) => {
  const navigate = useNavigate();
  // Elementos del menú - puedes personalizarlos según tus necesidades
  const navigationItems = [
    { label: 'Inicio', href: '/', isActive: true },
    { label: 'Ediciones', href: '/Ediciones' },
    { label: 'Articulos', href: '/articulos' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Nosotros', href: '/nosotros' },
    { label: 'Contacto', href: '/contacto' }
  ];

  return (
    <header className={`gradient-header shadow-md  sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo a la izquierda */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* Navegación centrada */}
          <div className="hidden md:flex flex-1 justify-center">
            <Navigation items={navigationItems} />
          </div>

          {/* Buscador a la derecha */}
          <div className="hidden md:block w-64">
            <SearchInput 
              placeholder="Buscar artículos..."
              onSearch={onSearch}
            />
          </div>
          <button className='ml-2 py-2 px-2 bg-verde-codea text-white rounded-lg hover:bg-blue-700 transition' onClick={() => navigate('/iniciar-sesion')}>
            iniciar sesion
          </button>

          {/* Menú móvil - hamburguesa */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil desplegable */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {navigationItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className={`paragraph-magazine block px-3 py-2 rounded-md text-base font-medium ${
                  item.isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="px-3 py-2">
              <SearchInput 
                placeholder="Buscar artículos..."
                onSearch={onSearch}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
