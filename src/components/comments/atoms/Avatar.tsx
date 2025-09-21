import React from 'react';
import type { AvatarProps } from '../types';

export const Avatar: React.FC<AvatarProps> = ({ 
  username, 
  size = 'medium', 
  variant = 'primary' 
}) => {
  const sizeClasses = {
    small: 'w-5 h-5 text-xs',
    medium: 'w-8 h-8 text-sm',
    large: 'w-10 h-10 text-base'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-br from-azul-codea to-blue-600',
    secondary: 'bg-gradient-to-br from-gray-400 to-gray-600'
  };

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full flex items-center justify-center`}>
      <span className="text-white font-medium">
        {username.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};
