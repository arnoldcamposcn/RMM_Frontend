import React from 'react';
import type { LoadingSpinnerProps } from '../types';

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  color = 'border-azul-codea'
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 ${color} ${sizeClasses[size]}`}></div>
  );
};
