import React from 'react';
import type { FieldError, UseFormRegister } from 'react-hook-form';

interface FormInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: string;
  label?: string;
  error?: FieldError;
  register: UseFormRegister<any>;
  required?: boolean;
}

export const FormInput = ({ 
  name,
  label, 
  error, 
  register,
  required = false, 
  className = "", 
  ...props 
}: FormInputProps) => {
  return (
    <div className="relative group">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input 
        {...register(name)}
        {...props}
        id={name}
        className={`w-full px-4 py-3.5 bg-white/80 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/30 focus:border-blue-300/50 transition-all duration-300 group-hover:border-slate-300/70 placeholder-slate-400 ${
          error ? 'border-red-300 focus:ring-red-400/30 focus:border-red-300/50' : ''
        } ${className}`}
      />
      {/* Indicador visual muy sutil */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-0.5 h-5 bg-blue-300/30 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};
