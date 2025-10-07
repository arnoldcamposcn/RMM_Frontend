import React, { useState, useEffect } from 'react';
import type { ComentarioForo } from '../../schema/foro/foro';
import { Avatar } from '../comments/atoms/Avatar';
import { Button } from '../comments/atoms/Button';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';

interface ForoInlineCommentsProps {
  temaId: number;
  onClose: () => void;
}

export const ForoInlineComments: React.FC<ForoInlineCommentsProps> = ({
  temaId,
  onClose
}) => {
  const [comments, setComments] = useState<ComentarioForo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadComments();
  }, [temaId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Aquí deberías hacer la llamada a la API para cargar los comentarios
      // Por ahora simulamos la operación
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Datos simulados - reemplazar con llamada real a la API
      setComments([]);
    } catch (err) {
      setError('Error al cargar los comentarios');
      console.error('Error loading comments:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleLike = (commentId: number) => {
    // Implementar lógica de like
    console.log('Toggle like for comment:', commentId);
  };

  const handleReply = (commentId: number) => {
    // Implementar lógica de respuesta
    console.log('Reply to comment:', commentId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Comentarios
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex justify-center py-4">
          <LoadingSpinner size="small" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-semibold text-gray-700">
            Comentarios
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="text-center py-4">
          <p className="text-red-600 text-sm">{error}</p>
          <button
            onClick={loadComments}
            className="mt-2 text-sm text-blue-600 hover:text-blue-800"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-gray-700">
          Comentarios ({comments.length})
        </h4>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <p className="text-sm">No hay comentarios aún.</p>
            <p className="text-xs mt-1">¡Sé el primero en comentar!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
              <div className="flex items-start space-x-3">
                <Avatar
                  src={comment.autor.perfil_url}
                  alt={comment.autor.usuario_unico}
                  fallback={comment.autor.usuario_unico.charAt(0).toUpperCase()}
                  size="small"
                />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">
                      {comment.autor.usuario_unico}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatDate(comment.creado_en)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                    {comment.contenido}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleToggleLike(comment.id)}
                      className="flex items-center space-x-1 text-xs text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <span>🤍</span>
                      <span>{comment.likes_count}</span>
                    </button>
                    
                    <button
                      onClick={() => handleReply(comment.id)}
                      className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      Responder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
