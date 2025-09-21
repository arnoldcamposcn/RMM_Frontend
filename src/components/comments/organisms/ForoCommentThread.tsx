import React from 'react';
import type { ComentarioForo, ForoCommentLikes } from '../../../schema/foro/foro';
import { Avatar } from '../atoms/Avatar';
import { Button } from '../atoms/Button';
import { TextArea } from '../atoms/TextArea';
import { LoadingSpinner } from '../atoms/LoadingSpinner';

interface ForoCommentThreadProps {
  comment: ComentarioForo;
  commentLikes: Record<number, ForoCommentLikes>;
  commentState: Record<number, 'viewing' | 'editing' | 'replying'>;
  onEdit: (commentId: number, content: string) => void;
  onDelete: (commentId: number) => void;
  onReply: (parentId: number, content: string) => void;
  onToggleLike: (commentId: number) => void;
  onStartEdit: (commentId: number) => void;
  onCancelEdit: (commentId: number) => void;
  onStartReply: (commentId: number) => void;
  onCancelReply: (commentId: number) => void;
  isCurrentUserAuthor: (authorId: number) => boolean;
  loading?: boolean;
}

export const ForoCommentThread: React.FC<ForoCommentThreadProps> = ({
  comment,
  commentLikes,
  commentState,
  onEdit,
  onDelete,
  onReply,
  onToggleLike,
  onStartEdit,
  onCancelEdit,
  onStartReply,
  onCancelReply,
  isCurrentUserAuthor,
  loading = false
}) => {
  const [editContent, setEditContent] = React.useState(comment.contenido);
  const [replyContent, setReplyContent] = React.useState('');
  const [isEditing, setIsEditing] = React.useState(false);
  const [isReplying, setIsReplying] = React.useState(false);

  const currentLikes = commentLikes[comment.id];
  const isLiked = currentLikes?.user_liked || false;
  const likesCount = currentLikes?.total_likes || comment.likes_count;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== comment.contenido) {
      onEdit(comment.id, editContent.trim());
    }
    setIsEditing(false);
    onCancelEdit(comment.id);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.contenido);
    setIsEditing(false);
    onCancelEdit(comment.id);
  };

  const handleSaveReply = () => {
    if (replyContent.trim()) {
      onReply(comment.id, replyContent.trim());
      setReplyContent('');
    }
    setIsReplying(false);
    onCancelReply(comment.id);
  };

  const handleCancelReply = () => {
    setReplyContent('');
    setIsReplying(false);
    onCancelReply(comment.id);
  };

  const handleStartEdit = () => {
    setIsEditing(true);
    onStartEdit(comment.id);
  };

  const handleStartReply = () => {
    setIsReplying(true);
    onStartReply(comment.id);
  };

  const isAuthor = isCurrentUserAuthor(comment.autor.id);

  return (
    <div className={`border-l-2 ${comment.parent ? 'border-gray-200 ml-6' : 'border-blue-200'}`}>
      <div className="bg-white rounded-lg p-4 mb-3">
        {/* Header del comentario */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
             <Avatar 
               username={comment.autor.usuario_unico}
               size="small"
             />
            <div>
              <h4 className="font-medium text-gray-900">{comment.autor.usuario_unico}</h4>
              <p className="text-xs text-gray-500">{formatDate(comment.creado_en)}</p>
            </div>
          </div>

          {/* Acciones del comentario */}
          {isAuthor && (
            <div className="flex items-center space-x-2">
               <Button
                 variant="secondary"
                 size="small"
                 onClick={handleStartEdit}
                 disabled={isEditing || loading}
               >
                 ✏️
               </Button>
               <Button
                 variant="danger"
                 size="small"
                 onClick={() => onDelete(comment.id)}
                 disabled={loading}
               >
                 🗑️
               </Button>
            </div>
          )}
        </div>

        {/* Contenido del comentario */}
        <div className="mb-4">
          {isEditing ? (
            <div className="space-y-3">
               <TextArea
                 value={editContent}
                 onChange={(value) => setEditContent(value)}
                 placeholder="Edita tu comentario..."
                 rows={3}
               />
               <div className="flex items-center space-x-2">
                 <Button
                   size="small"
                   onClick={handleSaveEdit}
                   disabled={!editContent.trim() || loading}
                 >
                   Guardar
                 </Button>
                 <Button
                   variant="secondary"
                   size="small"
                   onClick={handleCancelEdit}
                   disabled={loading}
                 >
                   Cancelar
                 </Button>
               </div>
            </div>
          ) : (
            <p className="text-gray-700 whitespace-pre-wrap">{comment.contenido}</p>
          )}
        </div>

        {/* Acciones del comentario */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Like button */}
            <button
              onClick={() => onToggleLike(comment.id)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isLiked 
                  ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={loading}
            >
              <span>{isLiked ? '❤️' : '🤍'}</span>
              <span>{likesCount}</span>
            </button>

             {/* Reply button */}
             <Button
               variant="secondary"
               size="small"
               onClick={handleStartReply}
               disabled={isReplying || loading}
             >
               Responder
             </Button>
          </div>
        </div>

        {/* Formulario de respuesta */}
        {isReplying && (
          <div className="mt-4 pt-4 border-t border-gray-200">
             <TextArea
               value={replyContent}
               onChange={(value) => setReplyContent(value)}
               placeholder="Escribe tu respuesta..."
               rows={3}
             />
             <div className="flex items-center space-x-2 mt-2">
               <Button
                 size="small"
                 onClick={handleSaveReply}
                 disabled={!replyContent.trim() || loading}
               >
                 Responder
               </Button>
               <Button
                 variant="secondary"
                 size="small"
                 onClick={handleCancelReply}
                 disabled={loading}
               >
                 Cancelar
               </Button>
             </div>
          </div>
        )}

         {/* Loading spinner */}
         {loading && (
           <div className="flex justify-center mt-2">
             <LoadingSpinner size="small" />
           </div>
         )}
      </div>

      {/* Respuestas */}
      {comment.respuestas && comment.respuestas.length > 0 && (
        <div className="space-y-3">
          {comment.respuestas.map((reply) => (
            <ForoCommentThread
              key={reply.id}
              comment={reply}
              commentLikes={commentLikes}
              commentState={commentState}
              onEdit={onEdit}
              onDelete={onDelete}
              onReply={onReply}
              onToggleLike={onToggleLike}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
              onStartReply={onStartReply}
              onCancelReply={onCancelReply}
              isCurrentUserAuthor={isCurrentUserAuthor}
              loading={loading}
            />
          ))}
        </div>
      )}
    </div>
  );
};
