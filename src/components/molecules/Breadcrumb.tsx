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
  const routesWithoutHeader = ['', '/iniciar-sesion', '/registro'];

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
    <nav className="flex items-center text-sm font-medium text-gray-600 bg-white py-2 px-0 my-4 rounded-sm max-w-fit mx-auto md:mx-0">
      {/* Home siempre */}
      <Link to="/" className="text-gray-600 hover:text-indigo-500 transition-colors duration-200">
        Home
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
            <span className="mx-2 text-gray-400">›</span>
            {isLast ? (
              <span className="text-azul-codea font-semibold cursor-default">{label}</span>
            ) : (
              <Link
                to={path}
                className="text-gray-600 hover:text-indigo-500 transition-colors duration-200"
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
