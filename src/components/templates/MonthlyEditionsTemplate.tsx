import React from 'react';
import Title from '../atoms/Title';
import EditionContainer from '../../store/features/editions/EditionContainer';
// import GridArticles from '../../store/features/articles/gridArticles';



const EditionsTemplate: React.FC<{}> = ({
}) => {
  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
        {/* Columna 1: Última edición (2/3 del ancho en desktop) */}
        <div className="">
          <div className="mb-6">
            <Title className="text-xl">Última Edición</Title>
          </div>
          <div className="">
            <EditionContainer />
          </div>
        </div>

        {/* <div className="lg:col-span-1">
          <div className="mb-6">
            <Title className="text-xl">Articulos Recientes</Title>
          </div>
          <div className="flex flex-col space-y-4">
            <GridArticles />
          </div>
        </div> */}
      </div>

    </section>
  );
};

export default EditionsTemplate;
