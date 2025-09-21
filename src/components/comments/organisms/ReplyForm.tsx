import React from 'react';
import type { CommentFormProps } from '../types';
import { CommentForm } from './CommentForm';

interface ReplyFormProps extends CommentFormProps {
  parentAuthor: string;
  onCancel: () => void;
  level?: number; // Para el nivel de anidamiento
}

export const ReplyForm: React.FC<ReplyFormProps> = ({
  parentAuthor,
  onCancel,
  level = 1,
  ...commentFormProps
}) => {
  const indentLevel = level === 1 ? 'ml-8' : 'ml-4';
  const borderStyle = level === 1 ? 'border-l-2 border-gray-200' : 'border-l-2 border-gray-300';
  const bgStyle = level === 1 ? 'bg-gray-50' : 'bg-white border border-gray-200';

  return (
    <div className={`${indentLevel} ${borderStyle} pl-4 mt-3`}>
      <div className={`${bgStyle} rounded-lg p-4`}>
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Respondiendo a {parentAuthor}
        </h4>
        <CommentForm {...commentFormProps} />
        <button
          onClick={onCancel}
          className="mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancelar respuesta
        </button>
      </div>
    </div>
  );
};
