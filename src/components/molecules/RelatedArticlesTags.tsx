import React from 'react';
import type { Blog } from '../../schema/blog/blog';

interface RelatedArticlesTagsProps {
  blog: Blog;
  onRemoveArticle?: (articleId: number) => void;
  isEditing?: boolean;
}

export const RelatedArticlesTags: React.FC<RelatedArticlesTagsProps> = ({ 
  blog, 
  onRemoveArticle, 
  isEditing = false 
}) => {
  // Obtener los artículos relacionados del blog
  const relatedArticles = blog.articulos || [];
  
  if (relatedArticles.length === 0) {
    return (
      <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-600 text-sm">
          📄 No hay artículos relacionados con este blog
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
      <h3 className="text-green-800 font-medium mb-3 flex items-center">
        <span className="mr-2">📚</span>
        Artículos Relacionados ({relatedArticles.length})
        {isEditing && (
          <span className="ml-2 text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">
            Editable
          </span>
        )}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {relatedArticles.map((article) => (
          <div
            key={article.id}
            className="inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-green-100 text-green-800 border border-green-300 hover:bg-green-200 transition-colors"
          >
            <span className="mr-2">📄</span>
            <div className="flex flex-col">
              <span className="font-semibold truncate max-w-xs" title={article.titulo_articulo}>
                {article.titulo_articulo}
              </span>
              <span className="text-xs text-green-600">
                ID: {article.id} • {new Date(article.fecha_publicacion).toLocaleDateString('es-ES')}
              </span>
            </div>
            {isEditing && onRemoveArticle && (
              <button
                onClick={() => onRemoveArticle(article.id)}
                className="ml-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full p-1 transition-colors"
                title="Quitar este artículo del blog"
              >
                <span className="text-sm font-bold">×</span>
              </button>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-3 pt-2 border-t border-green-200">
        <div className="flex items-center justify-between text-xs text-green-600">
          <span>
            Total: {relatedArticles.length} artículo{relatedArticles.length !== 1 ? 's' : ''} asociado{relatedArticles.length !== 1 ? 's' : ''}
          </span>
          <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
            {blog.id}
          </span>
        </div>
      </div>
    </div>
  );
};
