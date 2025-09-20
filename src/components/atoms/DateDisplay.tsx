import React from 'react';

interface DateDisplayProps {
  // Opción 1: Fecha completa formateada (ej: "18/09/2025")
  formattedDate?: string;
  
  // Opción 2: Mes y año por separado (para compatibilidad)
  month?: string;
  year?: number;
  
  className?: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({
  formattedDate,
  month,
  year,
  className = ''
}) => {
  // Si se proporciona formattedDate, usar ese formato
  if (formattedDate) {
    return (
      <div className={`flex items-center ${className}`}>
        <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
          <span className="paragraph-magazine font-medium text-sm">
            📅 {formattedDate}
          </span>
        </div>
      </div>
    );
  }

  // Si no, usar el formato original (mes + año separados)
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
        <span className="paragraph-magazine font-medium text-sm">
          {month?.toUpperCase()}
        </span>
      </div>
      <div className="bg-gray-100 text-gray-800 px-3 py-1 rounded-lg">
        <span className="paragraph-magazine font-medium text-sm">
          {year}
        </span>
      </div>
    </div>
  );
};

export default DateDisplay;
