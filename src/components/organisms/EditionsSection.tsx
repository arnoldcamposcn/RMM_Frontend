import React from 'react';
// import Title from '../atoms/Title';
import FeaturedEditionContainer from '../../store/features/editions/FeaturedEditionContainer';
// import GridArticles from '../../store/features/blog/RelatedArticles';
import GridBlogs from '../../store/features/blog/gridBlogs';



interface EditionsSectionProps {
  className?: string;
}

/**
 * Componente EditionsSection - SOLO para Home
 * Usa EditionCard (diseño horizontal) en la columna derecha
 */
const EditionsSection: React.FC<EditionsSectionProps> = ({
  className = ''
}) => {
  return (
    <section className={`${className}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 py-8">
          
          {/* Columna 1: Última edición (2/3 del ancho en desktop) */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              {/* <Title className="title-magazine uppercase font-bold">Edición de lanzamiento</Title> */}
              <h2 className="text-2xl font-bold text-gray-800 pb-4">Ultima Edición</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#53C1A9] to-[#4AB39A] rounded-full"></div>

            </div>
              <FeaturedEditionContainer />
          </div>
          
          {/* Columna 2: Ediciones semanales (1/3 del ancho en desktop) */}
          <div className="lg:col-span-1">
            {/* Contenedor flex vertical para las cards */}
            <div className="flex flex-col space-y-4">
              {/* {weeklyEditions.map((edition) => (
                <EditionCard
                  key={edition.id}
                  image={edition.image}
                  title={edition.title}
                  editionNumber={edition.editionNumber}
                  onViewMore={() => onViewEdition?.(edition.id)}
                />
              ))} */}
              {/* <Title className="title-magazine uppercase font-bold">Blog Recientes</Title> */}
              <GridBlogs/>
              

              
            </div>
           
          </div>
          
      </div>
    </section>
  );
};

export default EditionsSection;
