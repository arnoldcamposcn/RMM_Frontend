// components/atoms/Card.tsx
import React from "react";
import { cleanRichText } from "../../utils/cleanRichText";

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, image, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#53C1A9]/30 group"
      onClick={onClick}
    >
      <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
          />
        ) : (
          <div className="text-center">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-500 text-sm">Sin imagen</span>
          </div>
        )}
        {/* Overlay sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        {/* Título con subrayado estilo magazine */}
        <div className="mb-4">
          <h3 className="title-magazine text-lg font-bold text-[#132F56] mb-2 leading-tight line-clamp-2">
            {title}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#4AB39A] to-[#3FA08A] rounded-full"></div>
        </div>
        
        {description && (
          <p className="paragraph-magazine text-sm text-gray-600 mb-4 leading-relaxed line-clamp-3">
            {cleanRichText(description)}
          </p>
        )}
        
        {onClick && (
          <button className="text-[#53C1A9] hover:text-[#4AB39A] font-semibold transition-colors duration-300 flex items-center space-x-1 group">
            <span>Ver más</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
