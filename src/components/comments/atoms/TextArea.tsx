import React from 'react';
import type { TextAreaProps } from '../types';

export const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  rows = 3,
  className = ''
}) => {
  const baseClasses = 'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-azul-codea focus:border-transparent resize-none transition-colors duration-200';
  
  const disabledClasses = disabled ? 'bg-gray-50 cursor-not-allowed' : '';

  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      rows={rows}
      className={`${baseClasses} ${disabledClasses} ${className}`}
    />
  );
};
