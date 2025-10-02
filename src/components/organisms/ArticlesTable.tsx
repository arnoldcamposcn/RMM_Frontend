import React from 'react';
import type { ArticleCreate } from '../../schema/article/article';

// Interfaz extendida para incluir el ID (necesario para la UI)
interface ArticleWithId extends Omit<ArticleCreate, 'imagen_principal' | 'banner'> {
  id: number;
  imagen_principal: string; // URL de la imagen desde el servicio
  banner: string; // URL del banner desde el servicio
}

interface ArticlesTableProps {
  articles: ArticleWithId[];
  onEdit: (article: ArticleWithId) => void;
  onDelete: (article: ArticleWithId) => void;
}

const ArticlesTable: React.FC<ArticlesTableProps> = ({ articles, onEdit, onDelete }) => {
  const getCategoryName = (categoryId: number): string => {
    const categories = {
      1: 'Tecnología',
      2: 'Innovación',
      3: 'Sostenibilidad',
      4: 'Seguridad',
      5: 'Otros'
    };
    return categories[categoryId as keyof typeof categories] || 'Desconocida';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header de la tabla */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Artículos</h3>
        <p className="text-sm text-gray-600 mt-1">Gestiona los artículos de Meta Mining</p>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imagen
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título del artículo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha de publicación
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {articles
              .sort((a, b) => a.id - b.id) // Ordenar por ID ascendente
              .map((article) => (
              <tr key={article.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {article.id}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-16 h-16 flex-shrink-0">
                    <img
                      src={article.imagen_principal}
                      alt={article.titulo_articulo}
                      className="w-full h-full object-cover rounded-md border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/64x64?text=No+Image';
                      }}
                    />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{article.titulo_articulo}</div>
                  {article.contenido && (
                    <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {article.contenido.length > 100 
                        ? `${article.contenido.substring(0, 100)}...` 
                        : article.contenido
                      }
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {getCategoryName(article.categoria_articulo)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(article.fecha_publicacion).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-3">
                    {/* Botón Editar */}
                    <button
                      onClick={() => onEdit(article)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                      title="Editar artículo"
                    >
                      <span className="mr-1">✏️</span>
                      Editar
                    </button>
                    
                    {/* Botón Eliminar */}
                    <button
                      onClick={() => onDelete(article)}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      title="Eliminar artículo"
                    >
                      <span className="mr-1">🗑️</span>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Estado vacío */}
      {articles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay artículos</h3>
          <p className="text-gray-500">Aún no se han creado artículos.</p>
        </div>
      )}
    </div>
  );
};

export default ArticlesTable;
