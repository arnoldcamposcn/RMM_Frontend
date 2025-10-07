import React, { useState } from 'react';
import type { Foro } from '../../schema/foro/foro';
import { ForoInlineCommentForm } from '../comments/molecules/ForoInlineCommentForm';
import { ForoInlineComments } from './ForoInlineComments';




import RequireAuth from '../../hooks/RequireAuth';
import { useAuthStatus } from '../../hooks/useAuthStatus';

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
  const { isAuthenticated } = useAuthStatus();

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

  const handleToggleLike = () => {
    // Solo ejecutar si el usuario está autenticado
    if (isAuthenticated) {
      onToggleLike(foro.id);
    }
    // Si no está autenticado, no hacer nada (no mostrar error ni advertencia)
  };

  return (
    <div className="bg-gradient-to-br from-white via-gray-50/30 to-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-[#53C1A9]/30 transition-all duration-300 group">
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
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-[#132F56] to-[#1e3a8a] flex items-center justify-center text-white font-bold text-lg shadow-md ${foro.autor.perfil_url ? 'hidden' : ''}`}>
                {foro.autor.usuario_unico.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="title-magazine text-xl font-bold text-[#132F56] mb-2 group-hover:text-[#53C1A9] transition-colors duration-300">
                {foro.titulo}
              </h3>
              
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span className="paragraph-magazine font-semibold text-[#132F56]">{foro.autor.usuario_unico}</span>
                <span>•</span>
                <span className="paragraph-magazine">{formatDate(foro.creado_en)}</span>
              </div>
            </div>
          </div>

          {/* Badge de categoría en la parte superior derecha */}
          <div className="ml-4">
            <span className="bg-gradient-to-r from-slate-500 to-slate-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold">
              {foro.categoria_foro.nombre_categoria}
            </span>
          </div>

          {/* Acciones del propietario */}
          <RequireAuth>
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
          </RequireAuth>
        </div>


        {/* Contenido */}
        <div className="paragraph-magazine text-gray-700 mb-4 leading-relaxed">
          <p>{truncateContent(foro.contenido)}</p>
        </div>
      </div>

      {/* Footer con acciones */}
      <div className="px-6 py-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white rounded-b-xl">
        <div className="flex items-center justify-between">
          {/* Botones de acción izquierda */}
          <div className="flex items-center space-x-4">
            <RequireAuth> 
            <button
              onClick={showInlineCommentForm ? handleCancelReply : handleReplyClick}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                showInlineCommentForm 
                  ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100' 
                  : 'text-[#132F56] hover:text-blue-600 bg-gray-100 hover:bg-blue-50'
              }`}
            >
              <span>{showInlineCommentForm ? '✕' : '💬'}</span>
              <span>{showInlineCommentForm ? 'Cancelar' : 'Responder'}</span>
            </button>
            </RequireAuth>
            <button
              onClick={showInlineComments ? handleCloseComments : handleViewCommentsClick}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                showInlineComments 
                  ? 'text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100' 
                  : 'text-[#132F56] hover:text-slate-600 bg-gray-100 hover:bg-slate-50'
              }`}
            >
              <span>{showInlineComments ? '✕' : '💬'}</span>
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
              onClick={handleToggleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md transform hover:-translate-y-0.5 ${
                isLiked 
                  ? 'bg-gradient-to-r from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 border border-red-200' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 hover:from-blue-50 hover:to-blue-100 hover:text-blue-600 border border-gray-200'
              }`}
            >
              <span className="text-lg">{isLiked ? '❤️' : '🤍'}</span>
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
