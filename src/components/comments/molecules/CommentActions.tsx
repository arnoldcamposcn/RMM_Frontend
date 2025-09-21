import React from 'react';
import type { CommentActionsProps } from '../types';

export const CommentActions: React.FC<CommentActionsProps> = ({
  onReply,
  onEdit,
  onDelete,
  canEdit = false,
  canDelete = false,
  isEditing = false,
  isDeleting = false,
  showReplies = false,
  repliesCount = 0,
  isExpanded = false,
  onToggleReplies
}) => {
  return (
    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onReply}
          className="flex items-center text-sm text-gray-500 hover:text-azul-codea transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Responder
        </button>
        
        {/* Botón Ver respuestas - Solo si hay respuestas */}
        {showReplies && repliesCount > 0 && onToggleReplies && (
          <button 
            onClick={onToggleReplies}
            className="flex items-center text-sm text-gray-500 hover:text-azul-codea transition-colors duration-200"
          >
            <svg className={`w-4 h-4 mr-1 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {isExpanded ? 'Ocultar respuestas' : `Ver ${repliesCount} respuesta${repliesCount > 1 ? 's' : ''}`}
          </button>
        )}
      </div>

      {/* Botones de gestión del comentario - Solo para el autor */}
      {(canEdit || canDelete) && (
        <div className="flex items-center space-x-2">
          {canEdit && onEdit && (
            <button
              onClick={onEdit}
              disabled={isEditing}
              className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors duration-200 disabled:opacity-50"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar
            </button>
          )}
          {canDelete && onDelete && (
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="flex items-center text-sm text-gray-500 hover:text-red-600 transition-colors duration-200 disabled:opacity-50"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-red-500 mr-1"></div>
                  Eliminando...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Eliminar
                </>
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
