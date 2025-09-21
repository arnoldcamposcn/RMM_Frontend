import React from 'react';
import type { EmptyStateProps } from '../types';

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = '💬',
  children
}) => {
  return (
    <div className="text-center py-6">
      <div className="text-gray-400 text-3xl mb-2">{icon}</div>
      <p className="text-gray-600 mb-1">{title}</p>
      <p className="text-sm text-gray-500 mb-4">{description}</p>
      {children}
    </div>
  );
};
