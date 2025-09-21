import React from 'react';
import type { Foro } from '../../schema/foro/foro';
import { Button } from '../comments/atoms/Button';

interface ForoCardProps {
  foro: Foro;
  onViewComments: (foroId: number) => void;
  onToggleLike: (foroId: number) => void;
  onEdit?: (foroId: number) => void;
  onDelete?: (foroId: number) => void;
  isLiked?: boolean;
  isOwner?: boolean;
}

export const ForoCard: React.FC<ForoCardProps> = ({ 
  foro, 
  onViewComments, 
  onToggleLike,
  onEdit,
  onDelete,
  isLiked = false,
  isOwner = false
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateContent = (content: string, maxLength: number = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {foro.titulo}
          </h3>
          
          {/* Categoría */}
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
            {foro.categoria_foro.nombre_categoria}
          </span>
        </div>

        {/* Acciones del propietario */}
        {isOwner && (onEdit || onDelete) && (
          <div className="flex items-center space-x-2 ml-4">
            {onEdit && (
              <button
                onClick={() => onEdit(foro.id)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                title="Editar tema"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(foro.id)}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                title="Eliminar tema"
              >
                🗑️
              </button>
            )}
          </div>
        )}
      </div>

      {/* Autor y fecha */}
      <div className="flex items-center text-sm text-gray-600 mb-3">
        <span className="font-medium">{foro.autor.usuario_unico}</span>
        <span className="mx-2">•</span>
        <span>{formatDate(foro.creado_en)}</span>
      </div>

      {/* Imagen */}
      {foro.imagen && (
        <div className="mb-4">
          <img 
            src={foro.imagen} 
            alt={foro.titulo}
            className="w-full h-48 object-cover rounded-md"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Contenido */}
      <div className="text-gray-700 mb-4">
        <p>{truncateContent(foro.contenido)}</p>
      </div>

      {/* Footer con acciones */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          {/* Likes */}
          <button
            onClick={() => onToggleLike(foro.id)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              isLiked 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            <span>{foro.likes_count}</span>
          </button>

          {/* Comentarios */}
          <button
            onClick={() => onViewComments(foro.id)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <span>💬</span>
            <span>{foro.comentarios?.length || 0}</span>
          </button>
        </div>

        {/* Botón para ver más */}
        <Button
          onClick={() => onViewComments(foro.id)}
          variant="secondary"
          size="small"
        >
          Ver Detalles
        </Button>
      </div>
    </div>
  );
};
