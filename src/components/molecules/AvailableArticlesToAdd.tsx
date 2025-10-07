import React, { useState, useEffect, useCallback } from 'react';
import type { Article } from '../../schema/article/article';
import { searchArticles } from '../../services/articles/article.service';

interface AvailableArticlesToAddProps {
  articles: Article[];
  blog: { articulos?: Article[] };
  onAddArticle: (article: Article) => void;
}

export const AvailableArticlesToAdd: React.FC<AvailableArticlesToAddProps> = ({ 
  articles, 
  blog, 
  onAddArticle 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce para la búsqueda
  const debouncedSearch = useCallback(
    async (term: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        setHasSearched(false);
        return;
      }

      setIsSearching(true);
      setHasSearched(true);
      
      try {
        const results = await searchArticles(term);
        setSearchResults(results);
      } catch (error) {
        console.error('Error al buscar artículos:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  // Effect para manejar el debounce de la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  // Función para manejar cambios en el input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Función para limpiar la búsqueda
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setHasSearched(false);
  };

  // Determinar qué artículos mostrar
  const articlesToShow = hasSearched ? searchResults : articles;
  
  // Filtrar artículos que no están ya asociados al blog
  const availableArticles = articlesToShow.filter(article => 
    !blog.articulos?.some(relatedArticle => relatedArticle.id === article.id)
  );

  return (
    <div className="space-y-4">
      {/* Barra de búsqueda */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar artículos por título..."
          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Estado de búsqueda */}
      {isSearching && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
          <p className="text-sm text-gray-500 mt-2">Buscando artículos...</p>
        </div>
      )}

      {/* Resultados */}
      {!isSearching && (
        <>
          {hasSearched && (
            <div className="text-sm text-gray-600 mb-3">
              {searchTerm && (
                <span>
                  Resultados para "{searchTerm}": {availableArticles.length} artículos encontrados
                </span>
              )}
            </div>
          )}

          {availableArticles.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {hasSearched ? (
                <p>No se encontraron artículos que coincidan con tu búsqueda</p>
              ) : (
                <p>No hay artículos disponibles para agregar</p>
              )}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 max-h-60 overflow-y-auto">
              {availableArticles.map(article => (
                <button
                  key={article.id}
                  onClick={() => onAddArticle(article)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors duration-200"
                >
                  <span className="mr-1">+</span>
                  {article.titulo_articulo}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AvailableArticlesToAdd;