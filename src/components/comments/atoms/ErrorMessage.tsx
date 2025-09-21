import React from 'react';
import type { ErrorMessageProps } from '../types';
import { Button } from './Button';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="text-center py-6">
      <div className="text-red-500 text-3xl mb-3">⚠️</div>
      <p className="text-gray-600 mb-3">{message}</p>
      {showRetry && onRetry && (
        <Button onClick={onRetry} variant="primary" size="medium">
          Reintentar
        </Button>
      )}
    </div>
  );
};
