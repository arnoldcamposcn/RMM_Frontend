import React, { useState } from 'react';
import type { Foro } from '../../schema/foro/foro';
import { ForoInlineCommentForm } from './ForoInlineCommentForm';
import { ForoInlineComments } from './ForoInlineComments';

interface ForoCardProps {
  foro: Foro;
  onViewComments?: (foroId: number) => void; // Ahora opcional ya que se usa inline
  onToggleLike: (foroId: number) => void;
  onEdit?: (foroId: number) => void;
  onDelete?: (foroId: number) => void;
  isLiked?: boolean;
  isOwner?: boolean;
}

export const ForoCard: React.FC<ForoCardProps> = ({ 
  foro, 
  onViewComments, // Mantenido para compatibilidad con componentes padre
  onToggleLike,
  onEdit,
  onDelete,
  isLiked = false,
  isOwner = false
}) => {
  const [showInlineCommentForm, setShowInlineCommentForm] = useState(false);
  const [showInlineComments, setShowInlineComments] = useState(false);

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

  const handleReplyClick = () => {
    setShowInlineCommentForm(true);
    setShowInlineComments(false); // Cerrar comentarios si están abiertos
  };

  const handleCancelReply = () => {
    setShowInlineCommentForm(false);
  };

  const handleCommentAdded = () => {
    setShowInlineCommentForm(false);
    // Opcional: refrescar la lista de comentarios o mostrar mensaje de éxito
  };

  const handleViewCommentsClick = () => {
    setShowInlineComments(true);
    setShowInlineCommentForm(false); // Ocultar formulario si está abierto
    // No llamar a onViewComments para mantener solo la vista inline
    // onViewComments se mantiene para compatibilidad con componentes padre
    if (onViewComments) {
      // Variable mantenida para compatibilidad, no se usa para evitar vista completa
    }
  };

  const handleCloseComments = () => {
    setShowInlineComments(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      {/* Header con imagen de perfil y acciones */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            {/* Imagen de perfil del usuario */}
            <div className="flex-shrink-0">
              {foro.autor.perfil_url ? (
                <img 
                  src={foro.autor.perfil_url} 
                  alt={`Perfil de ${foro.autor.usuario_unico}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  onError={(e) => {
                    // Si falla la imagen, mostrar avatar por defecto
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                  }}
                />
              ) : null}
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg ${foro.autor.perfil_url ? 'hidden' : ''}`}>
                {foro.autor.usuario_unico.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {foro.titulo}
              </h3>
              
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="font-medium">{foro.autor.usuario_unico}</span>
                <span>•</span>
                <span>{formatDate(foro.creado_en)}</span>
                <span>•</span>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                  {foro.categoria_foro.nombre_categoria}
                </span>
              </div>
            </div>
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

        {/* Imagen del tema */}
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
      </div>

      {/* Footer con acciones */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <div className="flex items-center justify-between">
          {/* Botones de acción izquierda */}
          <div className="flex items-center space-x-4">
            <button
              onClick={showInlineCommentForm ? handleCancelReply : handleReplyClick}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                showInlineCommentForm 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <span>{showInlineCommentForm ? '✕' : '💬'}</span>
              <span>{showInlineCommentForm ? 'Cancelar' : 'Responder'}</span>
            </button>
            
            <button
              onClick={showInlineComments ? handleCloseComments : handleViewCommentsClick}
              className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
                showInlineComments 
                  ? 'text-red-600 hover:text-red-700' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              <span>{showInlineComments ? '✕' : '👁️'}</span>
              <span>
                {showInlineComments 
                  ? 'Ocultar respuestas' 
                  : `Ver respuestas (${foro.comentarios?.length || 0})`
                }
              </span>
            </button>
          </div>

          {/* Reacciones en la derecha */}
          <div className="flex items-center space-x-3">
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
          </div>
        </div>
      </div>

      {/* Formulario de comentario inline - FUERA del card principal */}
      {showInlineCommentForm && (
        <div className="mt-2">
          <ForoInlineCommentForm
            temaId={foro.id}
            onCommentAdded={handleCommentAdded}
            onCancel={handleCancelReply}
          />
        </div>
      )}

      {/* Comentarios inline - FUERA del card principal */}
      {showInlineComments && (
        <div className="mt-2">
          <ForoInlineComments
            temaId={foro.id}
            onClose={handleCloseComments}
          />
        </div>
      )}
    </div>
  );
};
