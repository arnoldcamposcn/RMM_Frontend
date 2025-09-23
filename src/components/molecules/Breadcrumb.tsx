import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { getArticle } from '../../services/articles/article.service';
import { getBlog } from '../../services/blog/blog.service';
import { type Article } from '../../schema/article/article';
import { type Blog } from '../../schema/blog/blog';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Separamos la ruta y filtramos elementos vacíos
  const pathnames = location.pathname.split('/').filter((x) => x);
  const routesWithoutHeader = ['', '/iniciar-sesion', '/registrarse', '/reset-password', '/reset-password-confirm', '/reset-password-confirm/'];

  if(routesWithoutHeader.includes(location.pathname)) {
    return null;
  }

  if(location.pathname === '/' || routesWithoutHeader.includes(location.pathname)) {
    return null;
  }

  // Detectar si estamos en una ruta de artículo o blog específico
  const segment = pathnames[pathnames.length - 1];
  const prevSegment = pathnames[pathnames.length - 2];
  const isArticlePage = prevSegment === 'articulos' && !isNaN(Number(segment));
  const isBlogPage = prevSegment === 'blogs' && !isNaN(Number(segment));

  // Solo hacer fetch si estamos en una página específica
  const { data: article } = useFetch<Article>(
    () => getArticle(Number(segment)),
    isArticlePage ? [segment] : []
  );
  
  const { data: blog } = useFetch<Blog>(
    () => getBlog(Number(segment)),
    isBlogPage ? [segment] : []
  );

  return (
    <nav className="flex items-center text-sm font-medium bg-gradient-to-r from-gray-50 to-white py-3 px-4 my-6 rounded-lg shadow-sm border border-gray-100 max-w-fit mx-auto md:mx-0">
      {/* Home siempre */}
      <Link to="/" className="text-[#132F56] hover:text-[#53C1A9] transition-colors duration-300 font-semibold flex items-center space-x-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        <span>Inicio</span>
      </Link>

      {pathnames.map((name, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        // Solo usar títulos dinámicos para el último segmento si es un ID
        let label = name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        
        if (isLast && isArticlePage && article) {
          label = article.titulo_articulo;
        } else if (isLast && isBlogPage && blog) {
          label = blog.titulo_blog;
        }

        return (
          <React.Fragment key={path}>
            <span className="mx-3 text-[#53C1A9]/60 font-bold">›</span>
            {isLast ? (
              <span className="text-[#132F56] font-bold cursor-default bg-gradient-to-r from-[#53C1A9]/10 to-[#4AB39A]/10 px-2 py-1 rounded-md">
                {label}
              </span>
            ) : (
              <Link
                to={path}
                className="text-[#132F56] hover:text-[#53C1A9] transition-colors duration-300 font-medium hover:bg-[#53C1A9]/5 px-2 py-1 rounded-md"
              >
                {label}
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
