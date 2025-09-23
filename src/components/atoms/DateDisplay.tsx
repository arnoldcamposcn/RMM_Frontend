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
        <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 text-gray-800 px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
          <span className="paragraph-magazine font-semibold text-sm flex items-center space-x-2">
            <svg className="w-4 h-4 text-[#53C1A9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </span>
        </div>
      </div>
    );
  }

  // Si no, usar el formato original (mes + año separados)
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] text-white px-3 py-2 rounded-lg shadow-sm">
        <span className="paragraph-magazine font-bold text-sm">
          {month?.toUpperCase()}
        </span>
      </div>
      <div className="bg-gradient-to-r from-gray-50 to-white border border-gray-200 text-gray-800 px-3 py-2 rounded-lg shadow-sm">
        <span className="paragraph-magazine font-semibold text-sm">
          {year}
        </span>
      </div>
    </div>
  );
};

export default DateDisplay;
