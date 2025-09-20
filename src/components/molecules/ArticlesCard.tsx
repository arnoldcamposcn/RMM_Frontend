import React from 'react';

interface ArticlesCardProps {
  image: string;
  title: string;
  description: string;
  onViewMore?: () => void;
  className?: string;
}

const ArticlesCard: React.FC<ArticlesCardProps> = ({
  image,
  title,
  description,
  onViewMore,
  className = ''
}) => {
  return (
    <div className={`bg-white flex rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 min-h-[80px] ${className}`}>
      {/* Imagen a la izquierda */}
      <div className="relative w-20 sm:w-24 h-20 flex-shrink-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Contenido a la derecha */}
        <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
          {/* Número de edición */}
          <p className="paragraph-magazine text-sm text-gray-600 mb-2 line-clamp-2 leading-relaxed">
            {description}
          </p>
          {/* Título */}
          <h3 className="title-magazine text-sm leading-tight mb-2 flex-1 line-clamp-2">
            {title}
          </h3>
          <div className="flex justify-start">
          <button
            onClick={onViewMore}
            className="text-azul-codea hover:text-blue-800 text-sm font-medium transition-colors duration-200 paragraph-magazine whitespace-nowrap"
          >
            Ver Más &gt;
          </button>
        </div>
        
        {/* Botón Ver más */}
        
      </div>
    </div>
  );
};

export default ArticlesCard;
