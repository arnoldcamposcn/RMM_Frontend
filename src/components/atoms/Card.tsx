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
      className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="h-52 bg-gray-200 flex items-center justify-center">
        {image ? (
          <img src={image} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-gray-500">Sin imagen</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && <p className="text-gray-600 mb-4 truncate">{cleanRichText(description)}</p>
        }
        {onClick && (
          <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Ver más →
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
