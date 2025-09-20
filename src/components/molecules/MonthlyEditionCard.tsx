import React from 'react';

interface MonthlyEditionCardProps {
  image: string;
  month: string;
  // numero_edicion: number;
  // titulo_edicion: string;
  year: number;
  onViewPrint?: () => void;
  className?: string;
}

/**
 * Componente para mostrar ediciones mensuales
 * Estructura: Imagen, mes/año, botón "Ver impreso"
 */
const MonthlyEditionCard: React.FC<MonthlyEditionCardProps> = ({
  image,
  month,
  // numero_edicion,
  // titulo_edicion,
  year,
  onViewPrint,
  className = ''
}) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 transition-shadow duration-300 ${className}`}>
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={`Edición ${month} ${year}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
      {/* <p>{numero_edicion}</p> */}
      {/* <p>{titulo_edicion}</p> */}
      
      {/* Contenido */}
      <div className="p-4 flex flex-col items-center justify-center">
        {/* Mes y año */}
        <div className="text-center mb-4">
          <h3 className="title-magazine text-xl text-gray-800 mb-1">
            {month}
          </h3>
          <p className="paragraph-magazine text-gray-600 text-sm">
            {year}
          </p>
        </div>
        
        {/* Botón Ver impreso */}
        <button
          onClick={onViewPrint}
          className=" bg-azul-codea hover:bg-blue-700 text-white py-2 px-4 rounded-lg paragraph-magazine font-medium transition-colors duration-200"
        >
          Ver impreso
        </button>
      </div>
    </div>
  );
};

export default MonthlyEditionCard;
