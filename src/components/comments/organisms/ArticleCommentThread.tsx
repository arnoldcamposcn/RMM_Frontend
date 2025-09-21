import React from 'react';
import type { ArticlePostComment } from '../../types';
import { CommentHeader, CommentContent, CommentActions } from '../molecules';
import { ArticleReplyForm } from './ArticleReplyForm';

interface ArticleCommentThreadProps {
  comment: ArticlePostComment;
  isCurrentUserAuthor: (comment: ArticlePostComment) => boolean;
  commentState: {
    editingCommentId: number | null;
    editContent: string;
    isUpdating: boolean;
    isDeleting: number | null;
    replyingToCommentId: number | null;
    expandedComments: Set<number>;
  };
  onStartEdit: (comment: ArticlePostComment) => void;
  onCancelEdit: () => void;
  onSaveEdit: (commentId: number) => void;
  onEditContentChange: (content: string) => void;
  onDeleteComment: (commentId: number) => void;
  onStartReply: (commentId: number) => void;
  onCancelReply: () => void;
  onToggleReplies: (commentId: number) => void;
  isCommentExpanded: (commentId: number) => boolean;
  articleId: number;
  onCommentAdded: (parentId?: number) => void;
  size?: 'small' | 'medium' | 'large';
  level?: number; // Para el nivel de anidamiento
}

export const ArticleCommentThread: React.FC<ArticleCommentThreadProps> = ({
  comment,
  isCurrentUserAuthor,
  commentState,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onEditContentChange,
  onDeleteComment,
  onStartReply,
  onCancelReply,
  onToggleReplies,
  isCommentExpanded,
  articleId,
  onCommentAdded,
  size = 'medium',
  level = 0
}) => {
  const canEdit = isCurrentUserAuthor(comment);
  const isEditing = commentState.editingCommentId === comment.id;
  const isDeleting = commentState.isDeleting === comment.id;
  const isReplying = commentState.replyingToCommentId === comment.id;
  const replies = comment.respuestas || [];
  const hasReplies = replies.length > 0;
  const isExpanded = isCommentExpanded(comment.id);

  const containerClasses = level === 0 
    ? "border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
    : "border-l-2 border-gray-200 pl-4";

  const bgClasses = level === 0 
    ? "" 
    : "bg-gray-50 rounded-lg p-3";

  return (
    <div className={`${containerClasses} ${level > 0 ? bgClasses : ''}`}>
      {/* Header del comentario */}
      <div className="flex items-center justify-between mb-3">
        <CommentHeader 
          author={comment.autor.usuario_unico}
          createdAt={comment.creado_en}
          size={size}
        />
      </div>

      {/* Contenido del comentario */}
      <div className="pl-11">
        <CommentContent
          content={comment.contenido}
          isEditing={isEditing}
          editContent={commentState.editContent}
          onEditContentChange={onEditContentChange}
          onSaveEdit={() => onSaveEdit(comment.id)}
          onCancelEdit={onCancelEdit}
          isUpdating={commentState.isUpdating}
          size={size}
        />
      </div>

      {/* Acciones del comentario */}
      <CommentActions
        onReply={() => onStartReply(comment.id)}
        onEdit={canEdit ? () => onStartEdit(comment) : undefined}
        onDelete={canEdit ? () => onDeleteComment(comment.id) : undefined}
        canEdit={canEdit}
        canDelete={canEdit}
        isEditing={isEditing}
        isDeleting={isDeleting}
        showReplies={hasReplies}
        repliesCount={replies.length}
        isExpanded={isExpanded}
        onToggleReplies={() => onToggleReplies(comment.id)}
      />

      {/* Formulario de respuesta */}
      {isReplying && (
        <ArticleReplyForm
          blogId={articleId} // Reutilizamos blogId como articleId
          parentId={comment.id}
          parentAuthor={comment.autor.usuario_unico}
          onCommentAdded={() => onCommentAdded(comment.id)}
          onCancel={onCancelReply}
          placeholder={`Responder a ${comment.autor.usuario_unico}...`}
          level={level + 1}
        />
      )}

      {/* Respuestas - Solo se muestran si el comentario está expandido */}
      {hasReplies && isExpanded && (
        <div className="ml-8 space-y-3 animate-in fade-in-0 slide-in-from-top-2 duration-300">
          {replies.map((reply) => (
            <ArticleCommentThread
              key={reply.id}
              comment={reply}
              isCurrentUserAuthor={isCurrentUserAuthor}
              commentState={commentState}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
              onSaveEdit={onSaveEdit}
              onEditContentChange={onEditContentChange}
              onDeleteComment={onDeleteComment}
              onStartReply={onStartReply}
              onCancelReply={onCancelReply}
              onToggleReplies={onToggleReplies}
              isCommentExpanded={isCommentExpanded}
              articleId={articleId}
              onCommentAdded={onCommentAdded}
              size="small"
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};
