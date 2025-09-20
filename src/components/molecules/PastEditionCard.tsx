import React from 'react';

interface PastEditionCardProps {
  image: string;
  month: string;
  title: string;
  description: string;
  editionNumber: number;
  onReadMore?: () => void;
  className?: string;
}

/**
 * Componente para mostrar ediciones pasadas
 * Estructura: Imagen izquierda + Contenido derecha (mes, título, descripción, enlace)
 */
const PastEditionCard: React.FC<PastEditionCardProps> = ({
  image,
  month,
  title,
  description,
  editionNumber,
  onReadMore,
  className = ''
}) => {
  return (
    <div className={`bg-white flex rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 ${className}`}>
      {/* Imagen a la izquierda */}
      <div className="relative w-24 sm:w-32 h-24 sm:h-32 flex-shrink-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Contenido a la derecha */}
      <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
        {/* Mes y fecha */}
        <div className="mb-4">
          <span className="inline-block bg-teal-500 text-white text-xs font-medium px-2 py-1 rounded">
            SUPLEMENTO DE LA SEMANA - {month}
          </span>
        </div>
        
        {/* Título */}
        <h3 className="title-magazine text-base font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          Edición {editionNumber}: {title}
        </h3>
        
        {/* Descripción */}
        <p className="paragraph-magazine text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
        
        {/* Botón/Enlace Seguir leyendo */}
        <div className="flex justify-start">
          <button
            onClick={onReadMore}
            className="paragraph-magazine text-azul-codea hover:text-blue-800 text-sm font-medium transition-colors duration-200 hover:underline"
          >
            Seguir Leyendo &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default PastEditionCard;
