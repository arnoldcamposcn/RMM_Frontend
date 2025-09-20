import React from 'react';
import DateDisplay from '../atoms/DateDisplay';
import ShareIcons from '../atoms/ShareIcons';

interface ContentSectionProps {
  // Opción 1: Fecha completa formateada (preferida)
  formattedDate?: string;
  
  // Opción 2: Mes y año por separado (para compatibilidad)
  month?: string;
  year?: number;
  
  content: string[];
  sharePlatforms?: ('facebook' | 'linkedin' | 'instagram')[];
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  formattedDate,
  month,
  year,
  content,
  sharePlatforms = ['facebook', 'linkedin', 'instagram'],
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Fecha */}
      <div className="flex justify-between items-center">
        <DateDisplay 
          formattedDate={formattedDate}
          month={month} 
          year={year} 
        />
        <div>
        <ShareIcons platforms={sharePlatforms} />
      </div>
      </div>
      
      {/* Iconos de compartir */}
      
      
      {/* Contenido */}
      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p key={index} className="paragraph-magazine text-gray-700 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ContentSection;
