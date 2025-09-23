import React from 'react';
import { cleanRichText } from '../../utils/cleanRichText';

export interface EditionCardData {
  id: number;
  title: string;
  image?: string;
}

interface EditionCardProps {
  id: number;
  title: string;
  contenido: string;
  image?: string;
  items: EditionCardData[];
  onViewMore?: () => void;
  className?: string;
}

const EditionCard: React.FC<EditionCardProps> = ({
  // id,
  image,
  contenido,
  title,
  onViewMore,
  className = ''
}) => {
  return (
    <div className={`edition-card flex overflow-hidden min-h-[110px] rounded-xl group ${className}`}>
      {/* Imagen con tamaño fijo y consistente */}
      <div className="edition-card-image relative w-20 sm:w-28 h-24 sm:h-32 flex-shrink-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Overlay sutil para efecto profesional */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Contenido con mejor espaciado y tipografía */}
      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between min-w-0">
        <div className="flex-1">
          <h3 className="edition-card-title title-magazine text-sm sm:text-base leading-tight mb-2 line-clamp-2">
            {title}
          </h3>
          {contenido && (
            <p className="edition-card-content paragraph-magazine text-xs sm:text-sm leading-relaxed mb-0 line-clamp-2 truncate">
              {cleanRichText(contenido)}
            </p>
          )}
        </div>
        
        {/* Botón 'Ver Más' con ícono elegante */}
        {onViewMore && (
          <div className="flex justify-start mt-2">
            <button
              onClick={onViewMore}
              className="view-more-btn inline-flex items-center space-x-2 text-[#53C1A9] hover:text-[#4AB39A] text-sm font-semibold transition-all duration-300 group/btn hover:bg-[#53C1A9]/5 px-0 py-1.5 rounded-lg hover:shadow-sm"
            >
              <span className="paragraph-magazine">Ver Más</span>
              <svg
                className="w-4 h-4 transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditionCard;