import React from 'react';
import { useForoComments } from '../comments/hooks/useForoComments';
import { ForoCommentThread } from '../comments/organisms/ForoCommentThread';
import { LoadingSpinner } from '../comments/atoms/LoadingSpinner';
import { ErrorMessage } from '../comments/atoms/ErrorMessage';
import { useCurrentUser } from '../../hooks/useCurrentUser';

interface ForoInlineCommentsProps {
  temaId: number;
  onClose?: () => void;
}

export const ForoInlineComments: React.FC<ForoInlineCommentsProps> = ({
  temaId,
  onClose
}) => {
  const {
    comments,
    loading,
    error,
    commentLikes,
    commentState,
    loadComments,
    createComment,
    updateComment,
    deleteComment,
    toggleCommentLike,
    startEdit,
    cancelEdit,
    startReply,
    cancelReply
  } = useForoComments(temaId);

  const { isOwner } = useCurrentUser();

  // Cargar comentarios cuando se monta el componente
  React.useEffect(() => {
    if (temaId) {
      loadComments();
    }
  }, [temaId, loadComments]);

  const handleEdit = async (commentId: number, content: string) => {
    try {
      await updateComment(commentId, content);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comentario?')) {
      try {
        await deleteComment(commentId);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  const handleReply = async (parentId: number, content: string) => {
    try {
      await createComment(content, parentId);
    } catch (error) {
      console.error('Error creating reply:', error);
    }
  };

  if (loading && comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0 rounded-t-none">
        <div className="p-4">
          <div className="flex justify-center py-4">
            <LoadingSpinner size="medium" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0 rounded-t-none">
        <div className="p-4">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0 rounded-t-none">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-gray-700">
              Comentarios (0)
            </h4>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Cerrar comentarios"
              >
                ✕
              </button>
            )}
          </div>
        </div>
        <div className="p-4">
          <div className="text-center py-4">
            <div className="text-gray-400 text-2xl mb-2">💭</div>
            <p className="text-gray-600 text-sm">No hay comentarios aún</p>
            <p className="text-gray-500 text-xs">Sé el primero en comentar</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 border-t-0 rounded-t-none">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 bg-gray-50">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">
            Comentarios ({comments.length})
          </h4>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Cerrar comentarios"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Lista de comentarios */}
      <div className="max-h-96 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-gray-100 last:border-b-0">
            <ForoCommentThread
              comment={comment}
              commentLikes={commentLikes}
              commentState={commentState}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onReply={handleReply}
              onToggleLike={toggleCommentLike}
              onStartEdit={startEdit}
              onCancelEdit={cancelEdit}
              onStartReply={startReply}
              onCancelReply={cancelReply}
              isCurrentUserAuthor={isOwner}
              loading={loading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
