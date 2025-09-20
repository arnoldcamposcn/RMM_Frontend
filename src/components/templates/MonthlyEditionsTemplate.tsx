import React from 'react';
import Title from '../atoms/Title';
import EditionContainer from '../../store/features/editions/EditionContainer';
import GridArticles from '../../store/features/articles/gridArticles';



const EditionsTemplate: React.FC<{}> = ({
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        {/* Columna 1: Última edición (2/3 del ancho en desktop) */}
        <div className="lg:col-span-2 pb-8">
          <div className="mb-6">
            <Title className="text-xl">Última Edición</Title>
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <EditionContainer />
          </div>
        </div>

        {/* Columna 2: Ediciones semanales (1/3 del ancho en desktop) */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <Title className="text-xl">Articulos Recientes</Title>
          </div>
          {/* Contenedor flex vertical para las cards */}
          <div className="flex flex-col space-y-4">
            <GridArticles />
          </div>
        </div>
      </div>

    </section>
  );
};

export default EditionsTemplate;
