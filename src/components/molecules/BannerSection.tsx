import React from 'react';

interface BannerSectionProps {
  title: string;
  bannerImage: string;
  className?: string;
}

const BannerSection: React.FC<BannerSectionProps> = ({
  title,
  bannerImage,
  className = ''
}) => {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Título de la página */}
      <div className="mb-6">
        <h1 className="title-magazine text-3xl md:text-4xl text-gray-800">
          {title}
        </h1>
      </div>
      
      {/* Banner vertical */}
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg">
        <img 
          src={bannerImage} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>
    </div>
  );
};

export default BannerSection;
