import React from 'react';
import type { CommentContentProps } from '../types';
import { TextArea, Button } from '../atoms';

export const CommentContent: React.FC<CommentContentProps> = ({
  content,
  isEditing = false,
  editContent = '',
  onEditContentChange,
  onSaveEdit,
  onCancelEdit,
  isUpdating = false,
  size = 'medium'
}) => {
  const textSize = size === 'small' ? 'text-sm' : size === 'large' ? 'text-base' : 'text-base';
  const buttonSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';
  const textareaRows = size === 'small' ? 2 : size === 'large' ? 4 : 3;

  if (isEditing) {
    return (
      <div className="space-y-3">
        <TextArea
          value={editContent}
          onChange={onEditContentChange || (() => {})}
          placeholder="Escribe tu comentario..."
          rows={textareaRows}
          className="w-full"
        />
        <div className="flex items-center space-x-2">
          <Button
            onClick={onSaveEdit}
            disabled={isUpdating || !editContent.trim()}
            loading={isUpdating}
            variant="primary"
            size={buttonSize}
          >
            {isUpdating ? 'Guardando...' : 'Guardar'}
          </Button>
          <Button
            onClick={onCancelEdit}
            disabled={isUpdating}
            variant="secondary"
            size={buttonSize}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <p className={`text-gray-700 leading-relaxed whitespace-pre-wrap ${textSize}`}>
      {content}
    </p>
  );
};
