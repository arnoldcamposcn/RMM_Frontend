import React from 'react';
// import { useLocation } from 'react-router-dom';
import BannerSection from '../molecules/BannerSection';
import ContentSection from '../molecules/ContentSection';
import EditionCard from '../molecules/EditionCard';
// import Title from '../atoms/Title';

interface WeeklyEditionData {
  id: number;
  image: string;
  title: string;
}

interface InformationSupplementsTemplateProps {
  pageTitle: string;
  bannerImage: string;
  formattedDate?: string; 
  month?: string;         // Compatibilidad: "septiembre"
  year?: number;          // Compatibilidad: 2025
  content: string[];
  sharePlatforms?: ('facebook' | 'linkedin' | 'instagram')[];
  
  // Columna 2: Ediciones semanales
  weeklyEditions: WeeklyEditionData[];
  onViewEdition?: (id: number) => void;
}

/**
 * Template para página de Información de Suplementos
 * Estructura: Banner superior + 2 columnas (contenido + ediciones semanales)
 */
const InformationSupplementsTemplate: React.FC<InformationSupplementsTemplateProps> = ({
  pageTitle,
  bannerImage,
  formattedDate,
  month,
  year,
  content,
  sharePlatforms = ['facebook', 'linkedin', 'instagram'],
  weeklyEditions,
  onViewEdition,
}) => {
  // const location = useLocation();
  // // Detectar si estamos en una página de artículos o blogs
  // const isArticlePage = location.pathname.includes('/articulos/');
  // const isBlogPage = location.pathname.includes('/blogs/');
  
  // // Título dinámico basado en la ruta
  // const relatedTitle = isArticlePage ? 'Artículos relacionados' : 
  //                     isBlogPage ? 'Blogs relacionados' : 
  //                     'Contenido relacionado';
  return (
    <div>
      {/* Sección superior: Título y Banner */}
      <BannerSection 
        title={pageTitle}
        bannerImage={bannerImage}
      />
      
      {/* Sección principal: 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-14 pb-20">
        
        {/* Columna 1: Fecha, compartir y contenido */}
        <div className="lg:col-span-2">
          <ContentSection
            formattedDate={formattedDate}
            month={month}
            year={year}
            content={content}
            sharePlatforms={sharePlatforms}
          />
        </div>
        
        {/* Columna 2: Ediciones semanales */}
        <div className="lg:col-span-1">
          {/* <div className="mb-6">
            <Title className="text-xl">{relatedTitle}</Title>
          </div>
           */}
          {/* Contenedor flex vertical para las cards */}
          <div className="flex flex-col space-y-4">
            {weeklyEditions.map((edition) => (
              <EditionCard
                key={edition.id}
                id={edition.id}
                image={edition.image}
                title={edition.title}
                items={[]} // Array vacío ya que este EditionCard no usa items
                onViewMore={() => onViewEdition?.(edition.id)}
              />
            ))}
          </div>
          
        
        </div>
        
      </div>
    </div>
  );
};

export default InformationSupplementsTemplate;
