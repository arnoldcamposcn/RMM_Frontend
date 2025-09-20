import React from 'react';
// import { cleanRichText } from '../../utils/cleanRichText';

export interface EditionCardData {
  id: number;
  title: string;
  image?: string;
}

interface EditionCardProps {
  id: number;
  title: string;
  image?: string;
  items: EditionCardData[];
  onViewMore?: () => void;
  className?: string;
}

const EditionCard: React.FC<EditionCardProps> = ({
  // id,
  image,
  title,
  onViewMore,
  className = ''
}) => {
  return (
    <div className={`bg-white flex overflow-hidden transition-shadow duration-300 min-h-[80px] ${className}`}>
      {/* Imagen a la izquierda */}
      <div className="relative w-20 sm:w-36 h-full flex-shrink-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 rounded-md"
        />
      </div>
      
      {/* Contenido a la derecha */}
        <div className="flex-1 p-3 flex flex-col  min-w-0">
    <div className="">
      <h3 className="title-magazine text-sm leading-tight mb-1 flex-1 line-clamp-2">
              {title}
            </h3>
            {/* <p>Hola</p> */}
            {onViewMore && (
          <div className="flex justify-start">
            <button
              onClick={onViewMore}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors duration-200 paragraph-magazine"
            >
              Ver Más →
            </button>
          </div>
        )}
      </div>
         
      </div>
    </div>
  );
};

export default EditionCard;
