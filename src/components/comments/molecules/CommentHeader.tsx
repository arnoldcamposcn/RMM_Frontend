import React from 'react';
import type { CommentHeaderProps } from '../types';
import { Avatar } from '../atoms';

export const CommentHeader: React.FC<CommentHeaderProps> = ({
  author,
  createdAt,
  size = 'medium'
}) => {
  const avatarSize = size === 'small' ? 'small' : size === 'large' ? 'large' : 'medium';
  const textSize = size === 'small' ? 'text-xs' : size === 'large' ? 'text-base' : 'text-sm';
  const authorSize = size === 'small' ? 'text-sm' : size === 'large' ? 'text-lg' : 'text-base';

  return (
    <div className="flex items-center space-x-3">
      <Avatar username={author} size={avatarSize} variant="primary" />
      <div>
        <p className={`font-medium text-gray-900 ${authorSize}`}>{author}</p>
        <p className={`text-gray-500 ${textSize}`}>
          {new Date(createdAt).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: size === 'small' ? 'short' : 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
      </div>
    </div>
  );
};
